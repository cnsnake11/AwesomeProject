/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//import React from 'react-native';
var React =require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

/*
let a=`
  There are <b>${React.count}</b> items
   in your basket, <em>${React.onSale}</em>
  are on sale!
`;
*/

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native ！！ios
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
