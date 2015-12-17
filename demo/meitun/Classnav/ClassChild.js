'use strict'


let React=require('react-native');
let css=require('./ClassChild.css');
let Loading=require('../../../bbt-react-native/views/Loading/Loading');
let Result=require('../Search/Result');

let {
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


let ClassChild=React.createClass({

    render(){

        let jsx;
        let classNav=this.props.classNav;
        let loadingChild=classNav.state.loadingChild;
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

        let classNav=this.props.classNav;
        let classParent=classNav.refs.classParent;

        let curIndex=0;
        if(classParent){//第一次渲染会没有
            curIndex=classParent.state.curIndex;
        }

        let allData=classNav.state.data;
        let data=allData[curIndex].childs;


        return (
            data.map((d,index)=>{
                return (
                    <TouchableOpacity onPress={this._press.bind(this,d)} key={index} >
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
        let id=data.id;
        let name=data.name;
        let nav=this.props.index.refs.nav;


        let router={
            'name':'result',
            'page':(
                <Result  nav={nav} fcategoryid={id} title={name} />
            ),
        };
        nav.push(router);


    },


});


module.exports=ClassChild;





























