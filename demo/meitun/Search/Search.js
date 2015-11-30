
'use strict'


var React=require('react-native');
var css=require('./Search.css');


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

    render(){
        var nav=this.props.nav;

        return (

            <View style={[css.wrapper,,React.Platform.OS=='ios'?css.iosWrapper:'']}>
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

        );

    },


    _search(e){
        var v=e.nativeEvent.text;
        var url=this._getUrl(v,1);

        console.log('do search keyword='+v);

        fetch(url).then((res)=>res.json())
        .then((res)=>{

                this._dealResult(res);

            });

    },


    _dealResult(res){

        var nav=this.props.nav;
        var router={
            'title':'aaaa',
            'page':(
              <Text>搜索结果页面</Text>
            ),
        };
        nav.push(router);

    },


    _getUrl(keyWord,curpage){
        var s=encodeURI(keyWord);
        return 'http://m.meitun.com/mobile/search.htm?curpage='+curpage+'&keywords='+s+'&fcategoryid=null&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=627&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';
    },


});

module.exports=Search;