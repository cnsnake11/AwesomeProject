
'use strict'

var React=require('react-native');
var css=require('./Tab.css');
var checkProps=require('../../base/CheckProps/CheckProps');
var concatProps=require('../../base/ConcatProps/ConcatProps');


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
    LayoutAnimation,
    InteractionManager,
    ListView,
    }=React;


var Tab =React.createClass({

    _compName:'Tab',


    render(){
      return (
          <Text> in Tab !!!!</Text>
      )
    },

});

module.exports=Tab;