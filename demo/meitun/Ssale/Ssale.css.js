

'use strict'


var React=require('react-native');
var {
    StyleSheet,
    Dimensions,
    }=React;

var css=StyleSheet.create(
    {



        listWraper:{
            flexDirection:'row',
            flexWrap:'wrap',
         },



        listTouch:{
            width:Dimensions.get('window').width/2,
            padding:5,
          },

        listCellWrapper:{
            backgroundColor:'red',
            height:100,
            width:100,
        },


        listCellImg:{
            flex:1,
            height:145,
            resizeMode:'contain',
        },


        listCellWrapper2:{
            flexDirection:'row',

        },

        listCellPrice:{
            flex:1,

        },
        listCellOldPrice:{
            flex:1,
        },
        listCellDiscount:{
            flex:1,
        },

    }
);

module.exports=css;