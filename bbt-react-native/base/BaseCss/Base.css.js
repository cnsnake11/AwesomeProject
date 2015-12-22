

'use strict'


var React=require('react-native');
var {
    StyleSheet,
    Dimensions,
    }=React;

var css=StyleSheet.create(
    {


        /**
         * 隐藏
         */
        hidden:{
            position:'absolute',
            left:-9999,
            height:10, //加高是为了解决listview不停触发底部滚动事件的
            width:10,  //加宽是为了解决viewpager隐藏时候，ios会崩溃的问题
        },
    }
);

module.exports=css;