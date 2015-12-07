
'use strict'


var React=require('react-native');
var css=require('./Result.css');
var baseCss=require('../../../BbtReactNative/base/BaseCss/Base.css');
var ListViewBindUrl=require('../../../BbtReactNative/views/ListViewBindUrl/ListViewBindUrl');
var ResultTab=require('./ResultTab');
var Header=require('../Header/Header');
var Filter=require('./Filter');
var TabApi=require('../../../BbtReactNative/api/TabApi/TabApi');
var Detail=require('../Detail/Detail');

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
    }=React;


var Result =React.createClass({

    getInitialState(){

        return {
            curName:'mr',
            brandList:[],
        };

    },


    componentWillMount(){

        this._tabApi=new TabApi(
            {
                curName:this.state.curName
            }
        );

    },


    render(){


        return (


            <View style={[{flex:1},css.wrapper]}>

                <Header back={true} title={this.props.title} rightBtn=' ' nav={this.props.nav} />

                <ResultTab result={this} ref='resultTab' />



                    <ListViewBindUrl ref='list'
                                     style={[this.state.curName=='sx'?baseCss.hidden:'']}
                                     renderRow={this._renderRow }
                                     getUrl={this._getUrl}
                                     getData={this._getData}/>


                    <Filter style={[this.state.curName=='sx'?'':baseCss.hidden]} result={this} ref='filter' />


            </View>

        );
    },




    _sortId:{
        'mr':'',
        'xl':'SALES_COUNT_DESC',
        'jg':'SALES_PRICE_ASC',
    },


    _getUrl(curPage){

        var keywords=null;
        if(this.props.keyWord){
            keywords=encodeURI(this.props.keyWord);
        }

        var fcategoryid=null;
        if(this.props.fcategoryid){
            fcategoryid=this.props.fcategoryid;
        }




        var url= 'http://m.meitun.com/mobile/search.htm?curpage='+(curPage+1)+'&keywords='+keywords+'&fcategoryid='+fcategoryid+'&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=627&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';

        /*var sort='mr';
        if(this.refs.resultTab){//在第一次render的时候取不到，直接用默认值
            sort=this.refs.resultTab.state.curName;
        }*/


        var filter=this.refs.filter;

        if(filter){
            var brandId=filter.curBtnId;
            if(brandId)url=url+'&brandid='+brandId;
        }


        return url+'&sortfield='+this._sortId[this.state.curName];
    },

    _getData(res){
        this.setState({brandList:res.data.queries[0].value});
        return res.data.items;
    },

    _renderRow(rowData, sectionID, rowID){
        return (


            <TouchableOpacity onPress={this._press.bind(this,rowData)} >

                <View style={[css.listRowView]}>
                    <View style={[css.listLeftView]}>
                        <Image style={[css.listImage]}  source={{uri:rowData.picture}} />
                    </View>

                    <View style={[css.listRightView]}>

                        <View style={[css.topView]}>
                            <Text>{rowData.itemname}</Text>
                        </View>

                        <View style={[css.bottomView]}>

                            <View  style={[css.bottomView1]}>
                                <Text style={[css.text1,css.newPrice]}>¥{rowData.topicprice}</Text>
                                <Text style={[css.text1,css.oldPrice]}>{rowData.saleprice}</Text>
                                <Text style={[css.text1,css.discount]}>{rowData.discount}折</Text>
                            </View>

                            <View  style={[css.bottomView2]}>
                                <Text style={[css.salescount]}>{rowData.salescount}人已囤</Text>
                            </View>

                        </View>



                    </View>
                </View>

            </TouchableOpacity>

        );
    },

    _press(data){

        var nav=this.props.nav;

        nav.push(
            {
                name:'detail',
                page:(
                  <Detail nav={nav} productId={data.sku} title={data.itemname} specialId={data.topicid}/>
                ),
            }
        );

    },

});







module.exports=Result;