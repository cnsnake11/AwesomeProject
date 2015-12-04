
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

                    {this._tplBrandList()}

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


    _tplBrandList(){


        var brandList=this.props.result.state.brandList;

        return(
            <View style={[css.middleView2]}>


                {
                    brandList.map((brand)=>{

                        return (

                            <View style={[css.brandView]}

                                  onPress={this._pressBrand.bind(this,brand.id)}>

                                <Text style={[css.brandText]}>
                                    {brand.name}
                                </Text>

                            </View>

                        );

                    })
                }


            </View>
        );
    },


    //todo view对象貌似不支持 onpress
    //todo 这里应该再封装一个按钮的组件，自己来存自己是否选中的状态，但是如何与提交的对象同步选中的数据呢

    _pressBrand(id){

      alert(id);

    },


});





module.exports=Filter;