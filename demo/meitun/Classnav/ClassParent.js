'use strict'


var React=require('react-native');
var css=require('./ClassParent.css');

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


var ClassParent=React.createClass({


    getInitialState(){
        return {
          curIndex:0
        };
    },

    render(){
      return (
          <ScrollView>
              {this._tpl()}
          </ScrollView>
      );
    },


    _tpl(){

        var nav=this.props.classNav;
        var data=nav.state.data;

        return (
            data.map((d,index)=>{
              return(
                  <TouchableHighlight onPress={this._press.bind(this,d.id,index)} underlayColor='#e0e0e0' >
                      <View style={[css.wrapperView,this.state.curIndex==index?css.curWrapperView:null]}>
                          <Text style={[css.wrapperText]}>{d.name}</Text>
                      </View>
                  </TouchableHighlight>
              );
            })
        );

    },

    _press(pid,index){
        this.setState({curIndex:index});
        this.props.classNav._getData(pid,index);
    },

});


module.exports=ClassParent;