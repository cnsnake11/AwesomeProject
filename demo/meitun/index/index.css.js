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
                    height:25,
                    resizeMode:'contain',
                },
                titleSearchTouch:{
                    position:'absolute',
                    right:15,
                    bottom:10,
                    color:'#fff',

                },
                titleSearchText:{
                    color:'#fff',
                    fontSize:12,
                },



        hiddenCss:{
            position:'absolute',
            left:-9999,
            height:10,//加高是为了解决listview不停触发底部滚动事件的
        },
    }
);

module.exports=css;