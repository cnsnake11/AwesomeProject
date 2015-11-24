'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {
        wrapper:{
            flex:1,
            backgroundColor:'#fff',
        },
            titleView:{
                backgroundColor:'#1ca9bd',
                padding:5,
            },
            iosTitleView:{
                paddingTop:20,
            },

                titleLogoImage:{
                    height:28,
                    resizeMode:'contain',
                },


        hiddenCss:{
            position:'absolute',
            left:-9999,
        },
    }
);

module.exports=css;