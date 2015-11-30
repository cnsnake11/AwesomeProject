
'use strict'


var React=require('react-native');
var css=require('./Result.css');
var Loading=require('../../../components/Loading/Loading');
var ListViewBindUrl=require('../../../components/ListViewBindUrl/ListViewBindUrl');


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

                <View style={[{flex:0}]}>
                    <Text> result tab </Text>
                </View>


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


            <TouchableOpacity >

                <View style={[css.listRowView]}>
                    <View style={[css.listLeftView]}>
                        <Image style={[css.listImage]}  source={{uri:rowData.picture}} />
                    </View>

                    <View style={[css.listRightView]}>
                        <Text>{rowData.itemname}</Text>
                    </View>
                </View>

            </TouchableOpacity>

        );
    },

});

module.exports=Result;