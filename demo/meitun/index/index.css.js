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
                paddingTop:20,
                paddingBottom:5,
                flexDirection:'row',
                backgroundColor:'#1ca9bd',
            },
                titleBase:{
                    flex:1,
                    color:'#fff',
                    height:20,
                    lineHeight:20,
                    textAlign:'center',
                },
                titleText:{
                    fontSize:16,
                    fontWeight:'bold',
                },
                titleSearchText:{
                },
                titleLogoImage:{
                    resizeMode:'contain',
                },


        hiddenCss:{
            position:'absolute',
            left:-9999,
        },
    }
);

module.exports=css;