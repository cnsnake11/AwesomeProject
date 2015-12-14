
'use strict'

var React=require('react-native');
var css=require('./Ssale.css');

var Header=require('../Header/Header');
var ListViewBindUrl=require('../../../bbt-react-native/views/ListViewBindUrl/ListViewBindUrl');
var Loading=require('../../../bbt-react-native/views/Loading/Loading');
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
                                 renderHeader={this._renderHeader}
                                 contentContainerStyle={[css.listWraper]}
                                 renderRow={this._renderRow }
                                 getUrl={this._getUrl}
                                 getData={this._getData}/>
            </View>
        );
    },

    loadingTopImage:true,

    _renderHeader(){

        return  (
                 this.loadingTopImage==true?
                <View />
                :
                this._tplTopImage()

         );
    },

    _renderRow(data){

        return (

            <TouchableOpacity style={[css.listTouch]}
                              onPress={this._pressProduct.bind(this,data)}>

                <View style={[css.listCellWrapper]} >

                    <Image style={css.listCellImg} source={{uri:data.imageurl[0]}} />
                    <Text style={css.listCellTitle} numberOfLines={2} >{data.name}</Text>
                    <View style={[css.listCellWrapper2]}>
                        <Text style={[css.listCellPrice]}>￥{data.price}</Text>
                        <Text style={[css.listCellOldPrice]}>{data.oldprice}</Text>
                        <View style={[css.listCellDiscountView]}>
                            <Text style={[css.listCellDiscount]}>5.4折</Text>
                        </View>
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

        fetch(url).then((res)=>res.json())
        .then((res)=>{

                var imageStr=res.brandimages;

                this.topImages=this._getImageUrl(imageStr);

                this.loadingTopImage=false;
            });

    },

    _tplTopImage(){

        return (
            <View>
                {
                    this.topImages.map((img,index)=>{
                        return (
                            <Image source={{uri:img}} key={index}
                                   style={[css.topImage]}>
                            </Image>
                        );
                    })
                }
            </View>
        );

    },

    _getImageUrl(imageStr,res){
        if(!res)res=[];

        var index=imageStr.indexOf('src="');

        if(index==-1)return res;

        imageStr=imageStr.substring(index+5,imageStr.length);

        index=imageStr.indexOf('" ');
        var one=imageStr.substring(0,index);

        res.push(one.trim());

        imageStr=imageStr.substring(index,imageStr.length);

        return this._getImageUrl(imageStr,res);
    },


    _pressProduct(data){

        var nav=this.props.nav;

        nav.push(
            {
                name:'detail',
                page:(
                    <Detail nav={nav} productId={data.productid} title={data.name} specialId={data.specialid}/>
                ),
            }
        );
    },

    _share(){
      console.log('share clicked .');
    },

});

module.exports=Ssale;
