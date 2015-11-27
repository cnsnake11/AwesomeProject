'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {
        wrapper:{
            backgroundColor:'#1ca9bd',
            padding:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
        },
        iosWrapper:{
            paddingTop:20,
        },
            input:{
                flex:1,
                backgroundColor:'#fff',
                borderRadius:8,
                padding:0,
                height:30,

            },
            cancelTouch:{
                flex:0,
                marginLeft:5,
                paddingLeft:5,
                paddingRight:5,
            },
                cancelText:{
                    color:'#fff',
                },
    }
);

module.exports=css;