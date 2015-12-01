
'use strict'


var React=require('react-native');
var css=require('./Loading.css');
var checkProps=require('../CheckProps/CheckProps');

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
 * 无蒙板效果，只是统一加载loading的一个封装，方便整个项目统一更换loading样式
 */

var Loading=React.createClass({

    _compName:'Loading',

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
        checkProps.check(this);
    },


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

