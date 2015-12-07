
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


                    <TouchableOpacity style={[css.bottomTouch1]} onPress={this._pressCancel} >

                        <Text style={[css.bottomText1]}>
                            清除选项
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={[css.bottomTouch2]} onPress={this._pressOk}>

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
                            <FilterBtn brand={brand} filter={this}
                                       ref={'brandId_'+brand.id} />
                        );

                    })
                }

            </View>
        );
    },



    _pressOk(){

        var brandId=this.curBtnId;

        //if(!brandId)return;

        this.props.result.refs.resultTab._closeSx();
        this.props.result.refs.list.reload();
    },


    _pressCancel(){

        var btn=this._getBtn(this.curBtnId);
        if(btn)btn.setState({cur:false});
        this.curBtnId=null;
    },

    _getBtn(id){
        return this.refs['brandId_'+id];
    }


});



var FilterBtn=React.createClass({

    getInitialState(){
      return {
          cur:false,
      }
    },

    render(){

        var brand=this.props.brand;

        return (

            <TouchableWithoutFeedback  onPress={this._pressBrand.bind(this,brand.id)}>
                <View style={[css.brandView,this.state.cur==true?css.curBrandView:'']} >

                    <Text style={[css.brandText,this.state.cur==true?css.curBrandText:'']}>
                        {brand.name}
                    </Text>

                </View>
            </TouchableWithoutFeedback>

        );


    },


    _pressBrand(id){

        var filter=this.props.filter;

        var lastId=filter.curBtnId;

        var lastBtn=filter._getBtn(lastId);

        if(lastBtn)lastBtn.setState({cur:false});

        this.setState({cur:true});

        filter.curBtnId=id;

    },


});





module.exports=Filter;





















