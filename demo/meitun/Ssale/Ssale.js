
'use strict'

var React=require('react-native');
var css=require('./Ssale.css');

var Header=require('../Header/Header');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    }=React;


var Ssale =React.createClass({


    render(){
        return (
            <View>
                <Header back={true} title={this.props.title} share={true} nav={this.props.nav} />
                <Text> in ssale</Text>
            </View>
        );
    },

});

module.exports=Ssale;
