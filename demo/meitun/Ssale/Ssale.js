
'use strict'

var React=require('react-native');
var css=require('./Ssale.css');

var Header=require('../Header/Header');
var ListViewBindUrl=require('../../../BbtReactNative/views/ListViewBindUrl/ListViewBindUrl');

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
    BackAndroid,
}=React;


var Ssale =React.createClass({

    componentWillMount(){

        this._fetchDetail();

    },


    render(){
        return (
            <View style={{flex:1,backgroundColor:'white',}} >
                <Header back={true} title={this.props.title} nav={this.props.nav}
                        rightBtn='分享' rightBtnPress={this._share} />



                <ListViewBindUrl ref='list' style={{flex:1,}}
                                 contentContainerStyle={[css.listWraper]}
                                 renderRow={this._renderRow }
                                 getUrl={this._getUrl}
                                 getData={this._getData}/>


            </View>
        );
    },



    _renderRow(data){

        return (

            <TouchableOpacity style={[css.listTouch]} >

                <View sytle={[css.listCellWrapper]} >

                    <Image style={css.listCellImg} source={{uri:data.imageurl[0]}} />
                    <Text style={css.listCellTitle} numberOfLines={2} >{data.name}</Text>
                    <View sytle={[css.listCellWrapper2]}>
                        <Text sytle={[css.listCellPrice]}>{data.price}</Text>
                        <Text sytle={[css.listCellOldPrice]}>{data.oldprice}</Text>
                        <Text sytle={[css.listCellDiscount]}>5.4折</Text>
                    </View>

                </View>

            </TouchableOpacity>
        );

    },

    _getUrl(curPage){

        var data=this.props.data;
        var url='http://m.meitun.com/mobile/special/product.htm?specialid='+data.specialid+'&classifyid=&brandid=&ishave=&isascending=0&curpage='+(curPage+1)+'&oem=IOS&osversion=8.0%20&screenwidth=414&screenheight=736&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';

        return url;
    },

    _getData(res){
        return res.products;
    },



    _fetchDetail(){

        var data=this.props.data;

        var url='http://m.meitun.com/mobile/special/details.htm?specialid='+data.specialid+'&isTmrNotice=1&oem=IOS&osversion=8.0%20&screenwidth=414&screenheight=736&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';


    },

    _share(){
      console.log('share clicked .');
    },

});

module.exports=Ssale;
