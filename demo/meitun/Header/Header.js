
'use strict'


var React=require('react-native');
var css=require('./Header.css');
/*
var Search=require('../Search/Search');
*/

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


    propTypes:{
        back:React.PropTypes.boolean,
        logo:React.PropTypes.boolean,
        title:React.PropTypes.boolean,
        rightBtn:React.PropTypes.boolean,
        rightBtnPress:React.PropTypes.func,
        nav:React.PropTypes.instanceOf(Navigator).isRequired,
    },


    render(){

        var nav=this.props.nav;


        return (
            <View style={[css.titleView,{flex: 0},React.Platform.OS=='ios'?css.iosTitleView:'',this.props.style]}>


                {this.props.back==true?
                    <TouchableOpacity style={[css.titleBtnTouch]}
                                      onPress={()=>{
                                        if(nav){
                                            nav.pop()
                                        }else{
                                            console.error('获得不到导航器对象.');
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


                {this.props.rightBtn?
                    <TouchableOpacity style={[css.titleBtnTouch]} onPress={this.props.rightBtnPress} >
                        <Text style={[css.titleBtnText]}>{this.props.rightBtn}</Text>
                    </TouchableOpacity>
                    :null
                }

            </View>
        );

    },


});

module.exports=Header;