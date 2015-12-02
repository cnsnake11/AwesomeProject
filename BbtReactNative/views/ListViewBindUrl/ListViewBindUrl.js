

'use strict'


var React=require('react-native');
var css=require('./ListViewBindUrl.css');
var Loading=require('../Loading/Loading');
var propsCheck=require('../../base/PropsCheck/PropsCheck');
var propsConcat=require('../../base/PropsConcat/PropsConcat');


var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    ListView,
    }=React;


var ListViewBindUrl =React.createClass({


    //组件名称，一般输出调试信息的时候会比较有用
    _compName:'ListViewBindUrl',

    //组件的选项，定义在组件上，通过this.props来使用，
    //通过查看此选项，可以方便的知道组件都有哪些属性
    //利用checkProps可以方便的进行校验工作
    options:{

        getUrl:{
            must:true,
            type:'function'
        },
        getData:{
            must:true,
            type:'function',
        },

        //同时支持ListView的所有属性
    },

    curPage:0,
    data:[],

    clear(){//重置状态
        this._threadId=Math.random();
        this.curPage=0;
        this.data=[];
        //修复安卓下，切换数据源，高度不变，导致endreached事件会触发很多次
        if(React.Platform.OS=='android')this.refs.list.getScrollResponder().scrollTo(0);
        this.setState(this.getInitialState());
    },

    load(){//装载数据
        this._queryData();
    },

    reload(){//重置状态 并 装载数据
        this.clear();
        this.load();
    },


    _threadId:'init',//线程id，控制多个请求发出的时候[切换数据源的时候是可以发出多个请求的]，只有正确的请求可以去更新view


    getInitialState(){
        var ds=new ListView.DataSource({
            rowHasChanged: (r1, r2) => true
        });
        return {
            dataSource:ds.cloneWithRows([]),

            _loading:false,
            _noData:false,
        };
    },


    componentWillMount(){

        propsCheck.check(this,this.props);

        this._queryData();

    },


    render(){

        var jsx=(
            <ListView dataSource={this.state.dataSource} keyboardShouldPersistTaps={true} ref='list'
                      onEndReached={this._endReached }
                      onEndReachedThreshold={200}
                      renderFooter={this._renderFooter} />
        );

        return propsConcat.concat(this,jsx);
    },


    _renderFooter(){

        if(this.state._noData==true){
            return(
                <View style={css.footerLoadingView}>
                    <Text> 没有数据了.. </Text>
                </View>
            );
        }

        if(this.state._loading==true){
            return(
                <Loading style={css.footerLoadingView} show={true} />
            );
        }

    },


    _endReached(){
        this._queryData();
    },

    _queryData(){
        var _threadId=this._threadId;

        if(this.state._loading==true){
            console.log('尚有查询请求未完成，不能执行新的请求.');
            return;
        }

        if(this.state._noData==true){
            console.log('服务器已经没有数据了，不能执行新的请求.');
            return;
        }

        this.setState({_loading:true});

        var props=this.props;
        var getUrl=props.getUrl;

        var url=getUrl(this.curPage);
        if(!url){
            console.error('返回的url为空。');
            return;
        }


        console.log('开始发起新的请求....');

        fetch(url)
            .then((res)=>res.json())
            .then((res)=>{

                if(this._threadId!=_threadId){
                    console.log('threadId不一致，终止这次view更新.');
                    return;
                }

                console.log('请求成功.');

                var getData=props.getData;
                var data=getData(res);

                if(!data||data.length==0){
                    this.setState({_noData:true});
                    console.log('服务器已经没有数据了.');
                }else{
                    this.data=this.data.concat(data);
                    var ds=this.state.dataSource.cloneWithRows(this.data);
                    this.curPage=this.curPage+1;
                    this.setState({dataSource:ds});
                }

                console.log('更新view成功.');

            })
            .catch((error)=>console.error(error))
            .done(()=>{

                if(this._threadId!=_threadId){
                    //console.log('threadId不一致，终止这次view更新.22222');
                    return;
                }
                this.setState({_loading:false});
            });


    },



});

module.exports=ListViewBindUrl;