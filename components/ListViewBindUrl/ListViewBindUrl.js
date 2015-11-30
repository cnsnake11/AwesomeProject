

'use strict'


var React=require('react-native');
var css=require('./ListViewBindUrl.css');
var Loading=require('../Loading/Loading');


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


    curPage:0,
    data:[],


    getInitialState(){
        return {
            dataSource:new ListView.DataSource({
                rowHasChanged: (r1, r2) => true
            }),

            _loading:false,
            _noData:false,
        };
    },


    componentWillMount(){

        this._check();

        this._queryData();

    },


    render(){

        var props=this.props;

        return (

            <ListView dataSource={this.state.dataSource}
                      renderRow={this.props.renderRow}
                      onEndReached={this._endReached }
                      onEndReachedThreshold={200}
                      renderFooter={this._renderFooter}
                />

        );
    },


    _check(){
        var p=this.props;
        if(!p.getUrl){
            console.error('没有定义getUrl方法。');
        }

        if(!p.getData){
            console.error('没有定义getData方法。');
        }

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
                this.setState({_loading:false});
            });


    },



});

module.exports=ListViewBindUrl;