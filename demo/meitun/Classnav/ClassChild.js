'use strict'


var React=require('react-native');
var css=require('./ClassChild.css');
var Loading=require('../../../BbtReactNative/components/Loading/Loading');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    }=React;


var ClassChild=React.createClass({

    render(){

        var jsx;
        var classNav=this.props.classNav;
        var loadingChild=classNav.state.loadingChild;
        if(loadingChild==true){
            jsx=(
                <Loading show={loadingChild} />
            );
        }else{
            jsx=(
                <View style={[css.wrapper]}>
                    {this._tpl()}
                </View>
            );
        }


        return jsx;
    },


    _tpl(){

        var classNav=this.props.classNav;
        var classParent=classNav.refs.classParent;

        var curIndex=0;
        if(classParent){//第一次渲染会没有
            curIndex=classParent.state.curIndex;
        }

        var allData=classNav.state.data;
        var data=allData[curIndex].childs;



        return (
            data.map((d)=>{
                return (
                    <View style={[css.cellView]}>
                        <Image style={[css.image]} source={{uri:d.logourl}} />
                        <Text >{d.name}</Text>
                    </View>
                );
            })
        );

    },


});


module.exports=ClassChild;