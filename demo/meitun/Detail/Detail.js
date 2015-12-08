
'use strict'


var React=require('react-native');
var css=require('./Detail.css');
var baseCss=require('../../../BbtReactNative/base/BaseCss/Base.css');
var Loading=require('../../../BbtReactNative/views/Loading/Loading');
var Header=require('../Header/Header');
var Slider = require('./Slider');

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


var Detail =React.createClass({


    propTypes:{

        nav:React.PropTypes.instanceOf(Navigator).isRequired,
        title:React.PropTypes.string.isRequired,
        productId:React.PropTypes.string.isRequired,
        specialId:React.PropTypes.string.isRequired,

    },


    getInitialState(){
      return {
            init:false,//初始化
            initTrans:false,//页面初始化转场
      };
    },

    componentWillMount(){

        this._init();

        InteractionManager.runAfterInteractions(()=>this.setState({initTrans:true}));

    },

    render(){


      return (
         <View style={{flex:1}} >

             <Header nav={this.props.nav} back={true} title={this.props.title} rightBtn='分享' />

             {this.state.init==true&&this.state.initTrans==true?
                 <Slider data={this.initData.imageurl} />
                 :
                 <Loading show={true}/>
             }

         </View>
      )
    },



    _init(){
        var productId=this.props.productId;
        var specialId=this.props.specialId;

        var url='http://m.meitun.com/mobile/product/fma/details.htm?productid='+productId+'&specialid='+specialId+'&oem=IOS&osversion=8.0%20&screenwidth=414&screenheight=736&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';


        fetch(url).then((res)=>res.json())
        .then((res)=>{

                this.initData=res;
                this.setState({init:true});

            });

    }

});







module.exports=Detail;