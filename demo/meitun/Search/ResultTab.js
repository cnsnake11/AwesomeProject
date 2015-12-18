
'use strict'


var React=require('react-native');
var css=require('./ResultTab.css');



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
    TouchableWithoutFeedback,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    }=React;


var ResultTab =React.createClass({


    render(){

        var tabApi=this.props.tabApi;

        return (
          <View style={[css.wrapper]} >
              <ResultTabBtn  {...this.props} title='默认' name='mr'  />
              <ResultTabBtn  {...this.props} title='销量' name='xl' />
              <ResultTabBtn  {...this.props} title='价格' name='jg'   />
              <ResultTabBtn  {...this.props} title={tabApi.isCur('sx')?'关闭':'筛选'} name='sx' />
          </View>
        );

    },


});



var ResultTabBtn =React.createClass({


    render(){

        var tabApi=this.props.tabApi;
        var name=this.props.name;


        return (
            <TouchableWithoutFeedback style={[css.touch]} onPress={()=>this.props.onPress(name)} >
                <View style={[css.btnView]}>
                    <Text style={[css.text,tabApi.isCur(name)?css.textCur:'']}>
                        {this.props.title}
                    </Text>
                    <View style={tabApi.isCur(name)?css.borderBottom:''}></View>
                </View>
            </TouchableWithoutFeedback>
        );

    },



});



module.exports=ResultTab;