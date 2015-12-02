
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {
        wrapper:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderBottomWidth:1,
            borderBottomColor:'#eee',
            backgroundColor:'white',
        },



        touch:{
            flex:1,
        },

        btnView:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },

            text:{
                textAlign:'center',
                color:'#9a9a9a',
                fontSize:16,
                margin:10,
            },

            textCur:{
                color:'#000',
            },

            borderBottom:{
                height:2,
                backgroundColor:'#00bcd4',
                width:50,
                marginBottom:3,
            },
    }
);

module.exports=css;