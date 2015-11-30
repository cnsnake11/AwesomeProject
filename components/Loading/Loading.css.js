
'use strict'


var React=require('react-native');

var {
    StyleSheet,
    Dimensions,
    }=React;

var css=StyleSheet.create({

    wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',

        position:'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,

        backgroundColor:'rgba(255,255,255,.3)',

    },

    loadingText:{
        fontSize:16,
        color:'black',
    },

});

module.exports=css;