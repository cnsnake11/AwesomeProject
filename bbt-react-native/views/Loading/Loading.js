
'use strict'


var React=require('react-native');
var css=require('./Loading.css');
//var propsCheck=require('../../base/PropsCheck/PropsCheck');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Platform,
    ProgressViewIOS,
    ProgressBarAndroid,
    PropTypes,
    }=React;


/**
 * 无蒙板效果，只是统一加载loading的一个封装，方便整个项目统一更换loading样式
 */

var Loading=React.createClass({



    propTypes:{
        show:PropTypes.bool,
        style:PropTypes.any,//这没找到好的类型
    },

    /*_compName:'Loading',

    options:{
        show:{
            must:false,
            type:'boolean'
        },
        style:{
            must:false,
            type:'object',
        },
    },

    componentWillMount(){
        propsCheck.check(this,this.props);
    },*/


    render(){

        if(this.props.show==true){
            return (
                <View style={[css.wrapper,this.props.style]}>
                    <Text style={[css.loadingText]}>努力加载中....</Text>
                </View>
            );
        }else{
            return null;

        }


    },

});

module.exports=Loading;

