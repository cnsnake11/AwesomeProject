
'use strict'


var React=require('react-native');
var baseCss=require('../../../BbtReactNative/base/BaseCss/Base.css');

var TimerMixin = require('react-timer-mixin');

var Modal=require('./Modal');

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
    wrapper: {
        height: 200,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        justifyContent:'center',
        alignItems:'center',
    }
});

var PopPage=React.createClass({

    render(){

        var detail=this.props.detail;
        var show=detail.state.showModal;

        return (

            <Modal show={show}>

                <View style={[css.wrapper]}>
                    <Text> hello modal </Text>
                </View>

            </Modal>

         );
    },


});


module.exports=PopPage;












