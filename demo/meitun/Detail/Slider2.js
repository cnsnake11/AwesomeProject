
'use strict'


var React=require('react-native');
var Swiper = require('react-native-swiper');


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
    }=React;
var ViewPager = require('react-native-viewpager');

var styles = StyleSheet.create({

    slide: {
        flex: 1,
    },

});


var Slider = React.createClass({

    render: function(){

        var ds=new ViewPager.DataSource({
            pageHasChanged: () => true,
        }).cloneWithPages(this.props.data);

        return (
            <View style={{flexDirection:'row',height:340}}>
                <ViewPager
                    style={{flex:1}}
                    dataSource={ds}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={false}/>
            </View>
        );
    },


    _renderPage: function(data,pageID) {

        return (
            <Image style={[styles.slide]} source={{uri: data}} />
        );
    },

});

module.exports=Slider;

