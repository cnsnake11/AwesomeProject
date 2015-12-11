
'use strict'


var React=require('react-native');
var baseCss=require('../../base/BaseCss/Base.css');
var TimerMixin = require('react-timer-mixin');

var Mask=require('../Mask/Mask');

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
    PanResponder,
    LayoutAnimation,
    InteractionManager,
    PropTypes,
    }=React;


var css=StyleSheet.create({

    wrapper:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-20,//todo -20是兼容安卓高不准的问题
        top:0,
        left:0,
        backgroundColor:'transparent',

        padding:0,
        margin:0,
        flex:1,
        overflow:'visible',
        flexDirection:'row',
    },

    modal:{
        position:'absolute',
        left:0,
        bottom:0,
    },

});

var Modal=React.createClass({

    propTypes:{
        show:PropTypes.bool,
        onPressMask:PropTypes.func
    },


    getInitialState(){
        return {
            offset:new Animated.Value(-9999),
            reallyHidden:true,
        }
    },

    render(){
        return (

            <TouchableWithoutFeedback  onPress={this.props.onPressMask}
                                       style={[css.wrapper,this.state.reallyHidden==true?baseCss.hidden:'']}>

                <View style={[css.wrapper,this.state.reallyHidden==true?baseCss.hidden:'']}>

                    <Mask show={true} />

                    <TouchableWithoutFeedback   onPress={()=>false}>
                        <Animated.View  style={[css.modal,{transform:[{translateX:this.state.offset}]}]} >
                            {this.props.children}
                        </Animated.View>
                    </TouchableWithoutFeedback>

                </View>

            </TouchableWithoutFeedback>


        );
    },




    componentWillMount(){
        if(this.props.show==true)
        this._show();
    },



    componentWillReceiveProps(props2){

        if(this.props.show==props2.show){
            console.log('props not changed. return .');
            return;
        }

        console.log('props  changed show='+props2.show);
        if(props2.show==false){
            this._hide();
        }else{
            this._show();
        }

    },

    _show(){
        this.state.offset.setValue(-(Dimensions.get('window').width));
        this.setState({reallyHidden:false});
        Animated.spring(
            this.state.offset,         // Auto-multiplexed
            {toValue: 0,friction: 5, } // Back to zero
        ).start();
    },

    _hide(){
        Animated.timing(
            this.state.offset,         // Auto-multiplexed
            {toValue: -(Dimensions.get('window').width),duration: 200, } // Back to zero
        ).start(()=>this.setState({reallyHidden:true}));
    },


});


module.exports=Modal;












