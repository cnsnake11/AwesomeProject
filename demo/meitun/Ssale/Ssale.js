
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
                <Header back={true} title={this.props.title} nav={this.props.nav}
                        rightBtn='分享' rightBtnPress={this._share} />
                <Text> in ssale</Text>
            </View>
        );
    },


    _share(){
      console.log('share clicked .');
    },

});

module.exports=Ssale;
