
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {
        flagView:{
            flexDirection:'row',
            alignItems:'center',
            borderTopColor:'#dcdcdc',
            borderTopWidth:1,
            padding:10,
        },
            flagImg:{
                width:40,
                height:40,
                resizeMode:'contain',
                marginRight:10,
            },
            flagText:{
                color:'#666',
            },




        h1View:{
            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10,
        },
        h1Text:{
            fontSize:16,
        },




        h2View:{
            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10,
        },
        h2Text:{
            fontSize:14,
            color:'#666',
        },




        moneyView:{
            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10,
        },
        moneyText:{
            fontSize:22,
            color:'#ff9802',
            fontWeight:'bold',
        },





        postageView:{
            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10,
        },
        postageText:{
            fontSize:14,
            color:'#333',
        },




        taxView:{
            flexDirection:'row',
            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10,
        },
        leftView:{
            flex:0,
        },
        rightView:{
            flex:1,
        },
        taxText:{
            fontSize:14,
            color:'#999',
        },



        guaranteeView:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',

            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10,
        },

        guaranteeView1:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },

        guaranteeImg:{width:40,height:40,resizeMode:'contain',marginBottom:10,},

        guaranteeText:{},

    }
);

module.exports=css;