'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {

        titleView:{
            backgroundColor:'#1ca9bd',
            padding:5,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
        },
        iosTitleView:{
            paddingTop:20,
        },

            titleText:{
                flex:1,
                color:'#fff',
                fontSize:16,
                textAlign:'center',
            },

            titleLogoImage:{
                flex:1,
                height:25,
                resizeMode:'contain',
            },

            titleBtnTouch:{
                paddingLeft:5,
                paddingRight:5,
            },
            titleBtnText:{
                color:'#fff',
                fontSize:12,
            },


    }
);

module.exports=css;