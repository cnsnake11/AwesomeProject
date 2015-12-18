
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


    render(){

        return (
            <View style={[css.wrapper,this.props.style]}>

                 <View style={[css.topView]} >

                    <Text style={[css.topText]}>只显示有货</Text>
                    <Switch style={[css.topSwitch]}
                            onValueChange={(v)=>{this.props.onChangeSwitch(v)}}
                            value={this.props.showYh} />

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


                    <TouchableOpacity style={[css.bottomTouch1]} onPress={this.props.pressCancel} >

                        <Text style={[css.bottomText1]}>
                            清除选项
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={[css.bottomTouch2]} onPress={this.props.pressOk}>

                        <Text style={[css.bottomText2]}>
                            确定
                        </Text>

                    </TouchableOpacity>

                </View>


            </View>
        );

    },


    _tplBrandList(){


        var brandList=this.props.brandList;

        return(
            <View style={[css.middleView2]}>

                {
                    brandList.map((brand,index)=>{

                        return (
                            <FilterBtn pressBrand={this.props.pressBrand}
                                       curBtnId={this.props.curBtnId}
                                brand={brand} filter={this} key={index}
                                       ref={'brandId_'+brand.id} />
                        );

                    })
                }

            </View>
        );
    },



});



var FilterBtn=React.createClass({


    render(){

        var brand=this.props.brand;

        return (

            <TouchableWithoutFeedback  onPress={()=>this.props.pressBrand(brand.id)}>
                <View style={[css.brandView,this.props.curBtnId==brand.id?css.curBrandView:'']} >

                    <Text style={[css.brandText,this.props.curBtnId==brand.id?css.curBrandText:'']}>
                        {brand.name}
                    </Text>

                </View>
            </TouchableWithoutFeedback>

        );


    },


});





module.exports=Filter;





















