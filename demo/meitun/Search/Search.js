
'use strict'


var React=require('react-native');
var css=require('./Search.css');
var Loading=require('../../../BbtReactNative/components/Loading/Loading');
var Result=require('./Result');


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


var Search =React.createClass({


    getInitialState(){
        return {
            loading:false,
        };
    },


    render(){
        var nav=this.props.nav;

        return (

            <View style={{flex:1,}}>

                <View style={[css.wrapper,React.Platform.OS=='ios'?css.iosWrapper:'']}>
                    <TextInput style={[css.input]} ref='input'
                               returnKeyType='search'
                               autoFocus={true}
                               placeholder='商品或分类搜索'
                               onSubmitEditing={this._search}
                        />
                    <TouchableOpacity style={[css.cancelTouch]}
                        onPress={()=>nav.pop()} >
                        <Text style={[css.cancelText]}>取消</Text>
                    </TouchableOpacity>
                </View>

                <Loading show={this.state.loading} />
            </View>

        );

    },


    _search(e){
        var v=e.nativeEvent.text;
        if(!v)return;


        var nav=this.props.nav;
        var router={
            'name':'result',
            'title':'搜索结果页面',
            'page':(
                <Result keyWord={v} nav={nav} />
            ),
        };
        nav.push(router);
    },


});

module.exports=Search;