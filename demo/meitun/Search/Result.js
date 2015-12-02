
'use strict'


var React=require('react-native');
var css=require('./Result.css');
var Loading=require('../../../BbtReactNative/views/Loading/Loading');
var ListViewBindUrl=require('../../../BbtReactNative/views/ListViewBindUrl/ListViewBindUrl');
var ResultTab=require('./ResultTab');

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


var Result =React.createClass({

    getInitialState(){
        return {
            dataSource:null,
        };
    },


    render(){


        return (

            <View style={[{flex:1},css.wrapper]}>


                <View style={[{flex:0}]}>
                    <Text> search bar </Text>
                </View>

                <ResultTab />

                <ListViewBindUrl style={[{flex:1}]}
                                 renderRow={this._renderRow }
                                 getUrl={this._getUrl}
                                 getData={this._getData}
                />

            </View>


        );
    },


    _getUrl(curPage){
        var s=encodeURI(this.props.keyWord);
        return 'http://m.meitun.com/mobile/search.htm?curpage='+(curPage+1)+'&keywords='+s+'&fcategoryid=null&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=627&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';
    },

    _getData(res){
        return res.data.items;
    },

    _renderRow(rowData, sectionID, rowID){
        return (


            <TouchableOpacity onPress={this._press} >

                <View style={[css.listRowView]}>
                    <View style={[css.listLeftView]}>
                        <Image style={[css.listImage]}  source={{uri:rowData.picture}} />
                    </View>

                    <View style={[css.listRightView]}>

                        <View style={[css.topView]}>
                            <Text>{rowData.itemname}</Text>
                        </View>

                        <View style={[css.bottomView]}>

                            <View  style={[css.bottomView1]}>
                                <Text style={[css.text1,css.newPrice]}>¥{rowData.topicprice}</Text>
                                <Text style={[css.text1,css.oldPrice]}>{rowData.saleprice}</Text>
                                <Text style={[css.text1,css.discount]}>{rowData.discount}折</Text>
                            </View>

                            <View  style={[css.bottomView2]}>
                                <Text style={[css.salescount]}>{rowData.salescount}人已囤</Text>
                            </View>

                        </View>



                    </View>
                </View>

            </TouchableOpacity>

        );
    },

    _press(){
        //this.props.nav.pop();
        console.log('pressed');
    },

});




module.exports=Result;