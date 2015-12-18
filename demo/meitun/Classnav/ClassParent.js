'use strict'


let React=require('react-native');
let css=require('./ClassParent.css');

let {
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


let ClassParent=React.createClass({



    render(){
      return (
          <ScrollView>
              {this._tpl()}
          </ScrollView>
      );
    },


    _tpl(){

        let data=this.props.data;

        return (
            data.map((d,index)=>{
              return(
                  <TouchableHighlight key={index} onPress={()=>this.props.onPress(d.id,index)} underlayColor='#e0e0e0' >
                      <View style={[css.wrapperView,this.props.curIndex==index?css.curWrapperView:null]}>
                          <Text style={[css.text,this.props.curIndex==index?css.curText:null]}>{d.name}</Text>
                      </View>
                  </TouchableHighlight>
              );
            })
        );

    },


});


module.exports=ClassParent;