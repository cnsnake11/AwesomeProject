
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

                <Text>in filter</Text>

                <Switch />

            </View>
        );

    },


});





module.exports=Filter;