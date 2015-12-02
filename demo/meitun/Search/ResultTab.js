
'use strict'


var React=require('react-native');
var css=require('./ResultTab.css');
var TabApi=require('../../../BbtReactNative/api/TabApi/TabApi');


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

    getInitialState(){

        return {
            curName:'mr',
        };

    },


    componentWillMount(){

        this._tabApi=new TabApi(
            {
                curName:this.state.curName,
                tabNames:['mr','xl','jg','sx'],
            }
        );

    },


    render(){

        return (
          <View style={[css.wrapper]} >
              <ResultTabBtn  title='默认' name='mr' tabApi={this._tabApi} resultTab={this} />
              <ResultTabBtn  title='销量' name='xl' tabApi={this._tabApi} resultTab={this} />
              <ResultTabBtn  title='价格' name='jg' tabApi={this._tabApi} resultTab={this} />
              <ResultTabBtn  title='筛选' name='sx' tabApi={this._tabApi} resultTab={this}/>
          </View>
        );

    },

});



var ResultTabBtn =React.createClass({


    render(){

        var tabApi=this.props.tabApi;
        var name=this.props.name;


        return (
            <TouchableWithoutFeedback style={[css.touch]} onPress={this._press} >
                <View style={[css.btnView]}>
                    <Text style={[css.text,tabApi.isCur(name)?css.textCur:'']}>
                        {this.props.title}
                    </Text>
                    <View style={tabApi.isCur(name)?css.borderBottom:''}></View>
                </View>
            </TouchableWithoutFeedback>
        );

    },



    _press(){
        var name=this.props.name;
        var tabApi=this.props.tabApi;
        var resultTab=this.props.resultTab;

        tabApi.clicked(name);
        resultTab.setState({
            curName:name,
        });


        this.props.resultTab.props.result.refs.list.reload();
    }


});



module.exports=ResultTab;