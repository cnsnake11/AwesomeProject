

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

        },

        listCellWrapper:{
            width:Dimensions.get('window').width/2,
            padding:8,
        },


        listCellImg:{
            height:145,
            resizeMode:'contain',
        },





        listCellWrapper2:{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
        },

            listCellPrice:{
                color:'#ed5565',
                fontWeight:'700',
                marginRight:10,
            },
            listCellOldPrice:{
                color:'#a0a0a0',
                marginRight:10,
                textDecorationLine:'line-through',
                fontSize:12,
            },

            listCellDiscountView:{
                backgroundColor:'#ed5565',
                borderRadius:3,
                paddingLeft:2,
                paddingRight:2,

                position:'absolute',
                right:0,
            },
            listCellDiscount:{
                 color:'#fff',
                 fontSize:12,
             },

    }
);

module.exports=css;