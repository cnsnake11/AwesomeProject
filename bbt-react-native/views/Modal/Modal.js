
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
        height:Dimensions.get('window').height,
        top:0,
        left:0,
        backgroundColor:'transparent',
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
            animateRight:new Animated.Value(-9999),
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
                        <Animated.View  style={[css.modal,{left:this.state.animateRight}]} >
                            {this.props.children}
                        </Animated.View>
                    </TouchableWithoutFeedback>

                </View>

            </TouchableWithoutFeedback>

        );
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
        this.state.animateRight.setValue(-(Dimensions.get('window').width));
        this.setState({reallyHidden:false});
        Animated.spring(
            this.state.animateRight,         // Auto-multiplexed
            {toValue: 0,friction: 5, } // Back to zero
        ).start();
    },

    _hide(){
        Animated.timing(
            this.state.animateRight,         // Auto-multiplexed
            {toValue: -(Dimensions.get('window').width),duration: 200, } // Back to zero
        ).start(()=>this.setState({reallyHidden:true}));
    },


});


module.exports=Modal;












