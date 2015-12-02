

'use strict'


var React=require('react-native');
var {
    StyleSheet,
    Dimensions,
    }=React;

var css=StyleSheet.create(
    {
        hidden:{
            position:'absolute',
            left:-9999,
            height:10, //加高是为了解决listview不停触发底部滚动事件的
        },
    }
);

module.exports=css;