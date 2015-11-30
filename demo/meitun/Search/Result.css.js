
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {

        wrapper:{

        },

        listRowView:{
            backgroundColor:'#fff',

            padding:10,
            flexDirection:'row',

            borderBottomWidth:1,
            borderBottomColor:'#eee',
            borderStyle:'solid',
        },

        listLeftView:{
            width:120,
        },

        listRightView:{
            flex:1,
        },

        listImage:{
            height:100,
            resizeMode:'contain',
        },
    }
);

module.exports=css;