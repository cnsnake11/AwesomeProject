
'use strict'


var React=require('react-native');
var BbtRN=require('../../../bbt-react-native');
var TimerMixin = require('react-timer-mixin');
var {
    baseCss,
    Modal,
    }=BbtRN;

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
    PropTypes,
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


    propTypes:{

        show:PropTypes.boolean,
        data:PropTypes.object.isRequired,
        onPressMask:PropTypes.func,
    },



    render(){


        return (

            <Modal show={this.props.show} onPressMask={this.props.onPressMask} >

                <View style={[css.wrapper]}>
                    <Text> hello modal </Text>
                </View>

            </Modal>

         );
    },


});


module.exports=PopPage;












