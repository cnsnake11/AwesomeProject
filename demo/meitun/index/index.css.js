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

        //todo 放入通用组件库中
        hiddenCss:{
            position:'absolute',
            left:-9999,
            height:10,//加高是为了解决listview不停触发底部滚动事件的
        },


        indexLoadingView:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
        },
    }
);

module.exports=css;