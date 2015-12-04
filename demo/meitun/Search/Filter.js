
'use strict'


var React=require('react-native');
var css=require('./Filter.css');

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
    TouchableWithoutFeedback,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    SwitchAndroid,
    SwitchIOS,
    Switch,
    }=React;


var Filter =React.createClass({


    getInitialState(){
        return {
            showYh:false,
        };
    },

    render(){

        return (
            <View style={[css.wrapper,this.props.style]}>

                <View style={[css.topView]} >

                    <Text style={[css.topText]}>只显示有货</Text>
                    <Switch style={[css.topSwitch]}
                            onValueChange={(v)=>{this.setState({showYh:v})}}
                            value={this.state.showYh} />

                </View>

                <View style={[css.middleView]}>

                    <Text style={[css.middleText]}>品牌</Text>
                    <TouchableOpacity style={[css.middleTouch]} >
                        <Text>△▽</Text>
                    </TouchableOpacity>

                </View>


                <ScrollView style={[css.scrollView]}>

                    <View style={[css.middleView2]}>
                        <View style={[css.brandView]}>

                            <Text style={[css.brandText]}>
                                你好你好
                            </Text>

                        </View>



                        <View style={[css.brandView,css.curBrandView]}>

                            <Text style={[css.brandText,css.curBrandText]}>
                                红果
                            </Text>

                        </View>

                        <View style={[css.brandView]}>

                            <Text style={[css.brandText]}>
                                中国
                            </Text>

                        </View>
                    </View>


                </ScrollView>


                <View style={[css.bottomView]}>


                    <TouchableOpacity style={[css.bottomTouch1]} >

                        <Text style={[css.bottomText1]}>
                            清除选项
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={[css.bottomTouch2]}>

                        <Text style={[css.bottomText2]}>
                            确定
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>
        );

    },


});





module.exports=Filter;