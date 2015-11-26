
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;



var css=StyleSheet.create(
    {
        wrapper:{
             flexDirection:'row',
            flexWrap:'wrap',
         },

            cellView:{
                width:70,
                 height:120,
                margin:5,
                justifyContent:'center',
                alignItems:'center',
            },

                image:{
                    width:70,
                    height:80,
                 },

    }
);

module.exports=css;