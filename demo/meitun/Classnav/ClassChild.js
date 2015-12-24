'use strict'


let React=require('react-native');
let css=require('./ClassChild.css');
//let Result=require('../Search/Result');

let BbtRN=require('../../../bbt-react-native');

let {
    BaseLogicObj,
    Loading,
    }=BbtRN;

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
        let loading=this.props.loading;

        if(loading==true){
            jsx=(
                <Loading show={true} />
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


        let data=this.props.data;


        return (
            data.map((d,index)=>{
                return (
                    <TouchableOpacity onPress={()=>this.props.onPress(d)} key={index} >
                        <View style={[css.cellView]}>
                            <Image style={[css.image]} source={{uri:d.logourl}} />
                            <Text >{d.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })
        );

    },



});


module.exports=ClassChild;





























