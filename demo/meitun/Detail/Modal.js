
'use strict'


var React=require('react-native');
var baseCss=require('../../../BbtReactNative/base/BaseCss/Base.css');
var TimerMixin = require('react-timer-mixin');

var Mask=require('./Mask');

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
    PanResponder,
    LayoutAnimation,
    InteractionManager,
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
        show:React.PropTypes.boolean,
    },

    render(){
        return (

            this.props.show==true?

                <TouchableOpacity  style={css.wrapper} onPress={()=>alert(1)} >

                    <Mask show={true} />

                    <Animated.View  style={css.modal} >
                        {this.props.children}
                    </Animated.View>

                </TouchableOpacity>
                :
                null

        );
    },


});


module.exports=Modal;












