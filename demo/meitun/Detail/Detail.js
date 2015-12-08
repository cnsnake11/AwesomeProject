
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

        var d=this.initData;

      return (
         <View style={{flex:1,backgroundColor:'#fff'}} >



             {this.state.init==true&&this.state.initTrans==true?
                 (
                     <ScrollView>
                         <Slider data={this.initData.imageurl} />

                         <View style={[css.flagView]} >
                             {d.countryimagepath?<Image style={[css.flagImg]} source={{uri:d.countryimagepath}} />:null}
                             <Text style={[css.flagText]}>{d.sendtype}</Text>
                         </View>

                         <View style={[css.h1View]}>
                             <Text style={[css.h1Text]}>{d.name}</Text>
                         </View>


                         <View style={[css.h2View]}>
                             <Text style={[css.h2Text]}>{d.detail}</Text>
                         </View>

                         <View style={[css.moneyView]}>
                             <Text style={[css.moneyText]}>￥{d.price}</Text>
                         </View>


                         <View style={[css.postageView]}>
                             <Text style={[css.postageText]}>包邮</Text>
                         </View>


                         <View style={[css.taxView]}>
                             <View style={[css.leftView]}>
                                 <Text style={[css.taxText]}>关税说明：</Text>
                             </View>

                             <View style={[css.rightView]}>
                                 <Text style={[css.taxText]}>税费 = 不含税价格 × 件数 × 商品税率</Text>
                                 <Text style={[css.taxText]}>根据海关规定，本商品适用税率为0%,若订单总税额 ≤ 50元，海关予以免征。</Text>
                             </View>
                         </View>


                         <View>
                             <Image style={{width:Dimensions.get('window').width,height:40,resizeMode:'stretch',}}
                                    source={{uri:'http://ms.meitun.com/resources/images/product_details/grain_5bd2ae0.png'}} ></Image>
                         </View>


                         <View style={[css.guaranteeView]} >

                             <View style={[css.guaranteeView1]}>
                                 <Image style={[css.guaranteeImg]}
                                        source={{uri:'http://ms.meitun.com/resources/images/product_details/tips001_5deb2f8.png'}} />
                                 <Text style={[css.guaranteeText]} >宝宝树正品保证</Text>
                             </View>


                             <View style={[css.guaranteeView1]}>
                                 <Image  style={[css.guaranteeImg]}
                                         source={{uri:'http://ms.meitun.com/resources/images/product_details/tips003_21ae2e4.png'}} />
                                 <Text  style={[css.guaranteeText]} >宝宝树妈妈首选</Text>
                             </View>

                         </View>



                         <TouchableOpacity style={[css.numTouch]}>
                             <View style={[css.numView]}>
                                <Text style={[css.numText1]}>选择：数量1</Text>
                                <Text style={[css.numText2]}>></Text>
                             </View>
                         </TouchableOpacity>



                         <View style={[css.borderView]} />


                         {d.reputation?
                             <View style={[css.commentView]} >
                                 <TouchableOpacity>
                                     <View style={[css.commentTitleView]} >
                                         <Text style={[css.commentTitleText1]}>
                                             用户评论({d.reputation.count}条)
                                         </Text>
                                         <Text style={[css.commentTitleText2]}>
                                             >
                                         </Text>
                                     </View>
                                 </TouchableOpacity>

                                 <View style={[css.commentUserView]} >
                                     <Text style={[css.commentUserText]}>{d.reputation.info.name}</Text>
                                     <Text style={[css.commentUserText]}>{d.reputation.info.time}</Text>
                                 </View>
                                 <View style={[css.commentContentView]}>
                                     <Text style={[css.commentContentText]}>
                                         {d.reputation.info.comment}
                                     </Text>
                                 </View>
                             </View>
                             :
                             (null)
                         }



                         <View style={[css.borderView,{height:50,alignItems:'center',justifyContent:'center'}]} >

                             <Text>上拉查看商品详情.</Text>

                         </View>


                        {
                            this._getImageUrl(d.imagethreeurl).map((img)=>{
                                return <Image source={{uri:img}} style={{height:400,resizeMode:'contain'}}/>
                            })
                        }


                     </ScrollView>
                 )
                 :
                 <Loading show={true}/>
             }


             <Header style={{position:'absolute',top:0,opacity:0.9 ,width:Dimensions.get('window').width}}
                 nav={this.props.nav} back={true} title={this.props.title} rightBtn='分享' />


             <View style={[css.bottomView]}>

                 <TouchableOpacity style={[{flex:1,}]} >
                     <View style={[css.bottomBaseView,css.bottomCarView]}>
                         <Image style={[css.bottomCarImg]}
                                  source={{uri:'http://ms.meitun.com/resources/images/icon/icon_car_2_175c837.png'}} />
                     </View>
                 </TouchableOpacity>
                 <TouchableOpacity style={[{flex:1,}]} >
                     <View style={[css.bottomBaseView,css.bottomAddView]}>
                        <Text style={[css.bottomText]}>加入购物车</Text>
                     </View>
                 </TouchableOpacity>

                 <TouchableOpacity style={[{flex:1,}]} >
                     <View style={[css.bottomBaseView,css.bottomBuyView]}>
                         <Text style={[css.bottomText]}>立即购买</Text>
                     </View>
                 </TouchableOpacity>

             </View>

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

});







module.exports=Detail;