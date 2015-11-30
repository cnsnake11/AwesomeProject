
'use strict'


var React=require('react-native');
var css=require('./Loading.css');


var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Platform,
    ProgressViewIOS,
    ProgressBarAndroid,
    }=React;


/**
 * 因为蒙板整个屏幕的效果是基于绝对定位做的，所以 Loading 组件必须要定义在根节点上面
 */

var Loading=React.createClass({



    render(){

        if(this.props.show==true){
            return (
                <View style={[css.wrapper]}>
                    <Text style={[css.loadingText]}>努力加载中....</Text>
                </View>
            );
        }else{
            return null;

        }


    },

});

module.exports=Loading;

