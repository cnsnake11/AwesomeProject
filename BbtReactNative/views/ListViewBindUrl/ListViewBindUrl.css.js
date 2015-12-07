
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    Dimensions,
    }=React;

var css=StyleSheet.create(
    {
        footerLoadingView:{
            height:45,
            alignItems:'center',
            justifyContent:'center',

            width:Dimensions.get('window').width,
            flex:0,
        },
    }
);

module.exports=css;