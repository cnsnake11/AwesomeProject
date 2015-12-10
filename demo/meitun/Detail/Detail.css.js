
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
            color:'#000'
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

        guaranteeImg:{width:40,height:40,resizeMode:'stretch',marginBottom:10,},

        guaranteeText:{},





        numView:{
            paddingTop:20,
            paddingBottom:20,
            paddingLeft:10,
            paddingRight:10,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderTopColor:'#dcdcdc',
            borderTopWidth:1,
            borderBottomColor:'#dcdcdc',
            borderBottomWidth:1,

        },
        numText1:{
          fontSize:16,
        },
        numText2:{
            fontSize:16,
        },


        

        borderView:{
            height:10,
            backgroundColor:'#f3f3f3',
        },




        commentView:{
            borderTopColor:'#dcdcdc',
            borderTopWidth:1,
            borderBottomColor:'#dcdcdc',
            borderBottomWidth:1,
            paddingLeft:10,
            paddingRight:10,
        },


        commentTitleView:{
            paddingTop:20,
            paddingBottom:20,
            flexDirection:'row',
        },

        commentTitleText1:{
            fontSize:16,
        },
        commentTitleText2:{
            fontSize:16,
            position:'absolute',
            right:0,
        },

        commentUserText:{
            color:'#a0a0a0',
        },

        commentUserView:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderTopWidth:1,
            borderTopColor:'#dcdcdc',
            borderStyle:'dotted',
            paddingTop:15,
            paddingBottom:15,
        },
        commentContentView:{
            paddingBottom:15,
        },

        commentContentText:{
            color:'#666',
        },







        bottomView:{
            flexDirection:'row',

        },

        bottomBaseView:{
            height:50,
            justifyContent:'center',
            alignItems:'center',
        },

        bottomCarView:{
            borderTopWidth:1,
            borderTopColor:'#dcdcdc'
        },
        bottomCarImg:{
            width:30,
            height:25,
            resizeMode:'stretch',
        },

        bottomAddView:{
            backgroundColor:'#ff9802',
        },

        bottomBuyView:{
            backgroundColor:'#00bcd6',
        },

        bottomText:{
            color:'#fff',
            fontSize:16,
            fontWeight:'bold',
            textAlign:'center',
        },




        headerBtnTouch:{
            position:'absolute',
            top:20,
            left:10,
            backgroundColor:'transparent',

         },

        headerBtnView:{
            opacity:0.8,
            width:25,
            height:25,
            borderRadius:13,
            backgroundColor:'#00bcd6',
            justifyContent:'center',
            alignItems:'center',
        },
        headerBtnText:{
            color:'white',
            fontWeight:'bold',
            fontSize:18,
        },

    }
);

module.exports=css;