'use strict'


var React=require('react-native');
var css=require('./ClassChild.css');
var Loading=require('../../../bbt-react-native/views/Loading/Loading');
var Result=require('../Search/Result');

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
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
                    <TouchableOpacity onPress={this._press.bind(this,d)} >
                        <View style={[css.cellView]}>
                            <Image style={[css.image]} source={{uri:d.logourl}} />
                            <Text >{d.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })
        );

    },

    _press(data){
        var id=data.id;
        var name=data.name;
        var nav=this.props.index.refs.nav;


        var router={
            'name':'result',
            'page':(
                <Result  nav={nav} fcategoryid={id} title={name} />
            ),
        };
        nav.push(router);


    },


});


module.exports=ClassChild;





























