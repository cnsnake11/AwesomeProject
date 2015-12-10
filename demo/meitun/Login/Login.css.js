
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {
        wrapper:{
            backgroundColor:'#f3f3f3',
            padding:20,
            flex:1,
        },

        textInput:{
            borderColor:'#ccc',
            borderWidth:1,
            height:40,
            borderRadius:5,
            backgroundColor:'#fff',
            marginBottom:20,
            padding:0,
            paddingLeft:35,
        },

        img:{
            position:'absolute',
            top:20,
            left:30,
            width:15,
            resizeMode:'contain',
            backgroundColor:'transparent',
        },


        touch:{
            marginBottom:10,
        },

        btnView:{
            backgroundColor:'#d7587e',
            padding:10,
            borderRadius:5,

        },

        btnText:{
            color:'#fff',
            fontSize:16,
            textAlign:'center',
            fontWeight:'bold',
        },


        forgetTouch:{
            position:'absolute',
            marginTop:10,
            right:20,
        },

        forgetBtnText:{
            color:'#666',
        },

    }
);

module.exports=css;