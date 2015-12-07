
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


var styles = StyleSheet.create({

    slide: {
        flex: 1,
    },

});


var Slider = React.createClass({

    render: function(){

        return (
            <Swiper showsButtons={false} autoplay={true}
                    height={400} showsPagination={true}>
                {this.props.data.map(
                    (img)=>{
                       return (
                           <Image style={[styles.slide]} source={{uri: img}} />
                       );
                    }
                )}
            </Swiper>
        );
    },



});

module.exports=Slider;

