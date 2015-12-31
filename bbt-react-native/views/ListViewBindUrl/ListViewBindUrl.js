

'use strict'


var React=require('react-native');
var css=require('./ListViewBindUrl.css');
var Loading=require('../Loading/Loading');
//var propsCheck=require('../../base/PropsCheck/PropsCheck');
//var propsConcat=require('../../base/PropsConcat/PropsConcat');


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
    PropTypes,
    }=React;

/**
 * 绑定服务器分页服务的listview
 * 滚动到底部会自动访问服务器服务
 */
var ListViewBindUrl =React.createClass({


    propTypes:{

        //还支持listview的所有属性
        //...ListView.propTypes,//没加上这句的原因是：加这个会提示一些错误,比如datasoure为定义等等


        /**
         * (curpage) => string
         * 根据传入的当前页curpage，返回一个url，此url是提供分页数据的url。
         */
        getUrl:PropTypes.func.isRequired,


        /**
         * (res) => array
         * 根据传入的fetch返回数据res，返回listview要用的数据，类型是数组。
         */
        getData:PropTypes.func.isRequired,


        /**
         * (rowdata) => renderable
         * 根据传入的行数据rowdata，返回一个jsx，用做listview的一行。
         * 此属性与listview的renderRow是。
         */
        renderRow:PropTypes.func.isRequired,


        /**
         * 初始化数据，如果提供此数组，组件初始化不会发请求，直接使用此数据作为第一次的初始化操作
         */
        initData:PropTypes.array,



    },


    /**
     * 当前所处页数
     */
    curPage:0,

    /**
     * 已经请求过的所有数据
     */
    data:[],

    /**
     * 重置状态,切换数据源之前请执行他
     */
    clear(){
        this._threadId=Math.random();
        this.curPage=0;
        this.data=[];
        //修复安卓下，切换数据源，高度不变，导致endreached事件会触发很多次
        if(React.Platform.OS=='android')this.refs.list.getScrollResponder().scrollTo(0);

        var o=this.getInitialState();
        o._initAnimateing=false;
        this.setState(o);
    },

    /**
     * 装载数据
     */
    load(){
        this._queryData();
    },

    /**
     * 重置状态 并 装载数据
     */
    reload(){
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
            //noDataText:'没有数据了..',

            _loading:false,
            _noData:false,


            _initLoading:true,
            _initAnimateing:true,
        };
    },


    componentWillMount(){

        InteractionManager.runAfterInteractions(()=>{
            this.setState({_initAnimateing:false})
        });

        if(this.props.initData){

            console.log('初始化使用initData装载数据.');
            //this.data=this.data.concat(this.props.initData);
            this._queryData(this.props.initData);

        }else{
            console.log('初始化请求服务器来装载数据');
            this._queryData();
        }

    },


    render(){

        var jsx=(
            this.state._initLoading==true||this.state._initAnimateing==true?
            <Loading show={true} style={this.props.style}/>
            :
            <ListView  ref='list'
                {...this.props}
                       dataSource={this.state.dataSource}
                       keyboardShouldPersistTaps={true}
                       onEndReached={this._endReached }
                       onEndReachedThreshold={200}
                       renderFooter={this._renderFooter}
                />
        );

        //return propsConcat.concat(this,jsx);
        return jsx;

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


    /**
     * 查询并装载数据or直接装载数据
     */
    _queryData(data){

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


        if(data){

            this._loadData(data,_threadId);

            if(this._threadId!=_threadId){
                //console.log('threadId不一致，终止这次view更新.');
                return;
            }
            this.setState({_loading:false,_initLoading:false});


        }else{

            var props=this.props;
            var getUrl=props.getUrl;

            var url=getUrl(this.curPage);
            if(!url){
                console.error('返回的url为空。');
                return;
            }

            console.log('开始发起新的请求....url='+url);

            fetch(url)
                .then((res)=>{
                    return res.json();
                })
                .then((res)=>{

                    /* if(this._threadId!=_threadId){
                     console.log('threadId不一致，终止这次view更新.');
                     return;
                     }

                     console.log('请求成功.');

                     var getData=props.getData;
                     var data=getData(res);


                     if(!data||data.length==undefined|| data.length==0){
                     this.setState({_noData:true});
                     console.log('服务器已经没有数据了.');
                     }else{
                     this.data=this.data.concat(data);
                     var ds=this.state.dataSource.cloneWithRows(this.data);
                     this.curPage=this.curPage+1;
                     this.setState({dataSource:ds});
                     }

                     console.log('更新view成功.');*/

                    console.log('请求成功.');
                    var getData=this.props.getData;
                    var data=getData(res);
                    this._loadData(data,_threadId);

                })
                .catch((error)=>console.error(error))
                .done((res)=>{

                    if(this._threadId!=_threadId){
                        //console.log('threadId不一致，终止这次view更新.');
                        return;
                    }
                    this.setState({_loading:false,_initLoading:false});
                });

        }




    },


    /**
     * 装载数据
     */
    _loadData(data,_threadId){

        //var props=this.props;
        //var _threadId=this._threadId;

        if(this._threadId!=_threadId){
            console.log('threadId不一致，终止这次view更新.');
            return;
        }

        //console.log('请求成功.');
        //var getData=props.getData;
        //var data=getData(res);


        if(!data||data.length==undefined|| data.length==0){
            this.setState({_noData:true});
            console.log('服务器已经没有数据了.');
        }else{
            this.data=this.data.concat(data);
            var ds=this.state.dataSource.cloneWithRows(this.data);
            this.curPage=this.curPage+1;
            this.setState({dataSource:ds});
        }

        console.log('更新view成功.');

    },



});

module.exports=ListViewBindUrl;