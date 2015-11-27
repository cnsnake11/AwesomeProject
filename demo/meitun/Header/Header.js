
'use strict'


var React=require('react-native');
var css=require('./Header.css');

var Search=require('../Search/Search');

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


var Header =React.createClass({


    render(){

        var nav=this.props.nav;


        return (
            <View style={[css.titleView,{flex: 0},React.Platform.OS=='ios'?css.iosTitleView:'']}>


                {this.props.back==true?
                    <TouchableOpacity style={[css.titleBtnTouch]}
                                      onPress={()=>{
                                        if(nav){
                                            nav.pop()
                                        }else{
                                            alert('获得不到导航器对象.');
                                        }
                                      }}  >
                        <Text style={[css.titleBtnText]}>返回</Text>
                    </TouchableOpacity>
                    :null
                }



                {this.props.logo==true?
                    <Image style={[css.titleLogoImage]}
                           source={require('./img/logo.png')} ></Image>
                    :null
                }

                {this.props.title?
                    <Text numberOfLines={1} style={[css.titleText]}>{this.props.title}</Text>
                    :null
                }



                {this.props.search==true?
                    <TouchableOpacity style={[css.titleBtnTouch]}
                                      onPress={()=>{

                                        nav.push({
                                            name:'search',
                                            page:(<Search nav={nav} />)
                                        });

                                      }}   >
                        <Text style={[css.titleBtnText]}>搜索</Text>
                    </TouchableOpacity>
                    :null
                }


                {this.props.share==true?
                    <TouchableOpacity style={[css.titleBtnTouch]} onPress={()=>alert('分享clicked')}   >
                        <Text style={[css.titleBtnText]}>分享</Text>
                    </TouchableOpacity>
                    :null
                }
            </View>
        );

    },
});

module.exports=Header;