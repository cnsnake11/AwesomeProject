
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

        var tabApi=this.props.result._tabApi;

        return (
          <View style={[css.wrapper]} >
              <ResultTabBtn  title='默认' name='mr' tabApi={this.props.result._tabApi} resultTab={this} />
              <ResultTabBtn  title='销量' name='xl' tabApi={this.props.result._tabApi} resultTab={this} />
              <ResultTabBtn  title='价格' name='jg' tabApi={this.props.result._tabApi} resultTab={this} />
              <ResultTabBtn  title={tabApi.isCur('sx')?'关闭':'筛选'} name='sx' tabApi={this.props.result._tabApi} resultTab={this}/>
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


        //todo 感觉这块的逻辑写的有点复杂，是不是哪块设计的不合理？
        if(name=='sx'){
            this._pressSx();
        }else{
            this._pressOther();
        }


    },



    _pressSx(){
        var tabApi=this.props.tabApi;
        var resultTab=this.props.resultTab;
        var result=resultTab.props.result;

        if(!tabApi.isCur('sx')){

            resultTab._storeName=result.state.curName;//当前缓存的list的name

            tabApi.clicked('sx');
            resultTab.props.result.setState({
                curName:'sx',
            });

        }else{//点的自己

            tabApi.clicked(resultTab._storeName);
            resultTab.props.result.setState({
                curName:resultTab._storeName,
            });
        }

    },


    _pressOther(){

        var name=this.props.name;
        var tabApi=this.props.tabApi;
        var resultTab=this.props.resultTab;

        if(tabApi.isCur(name)){//点的自己
            resultTab.props.result.refs.list.refs.list.getScrollResponder().scrollTo(0);
            return;
        }

        tabApi.clicked(name);
        resultTab.props.result.setState({
            curName:name,
        });


        if(resultTab._storeName!=name){//缓存的不是自己

            resultTab._storeName=null;

            //todo 这种直接调用接口的代码，而不是使用state来触发渲染的方式，还需要思考差异
            this.props.resultTab.props.result.refs.list.reload();
        }

    },


});



module.exports=ResultTab;