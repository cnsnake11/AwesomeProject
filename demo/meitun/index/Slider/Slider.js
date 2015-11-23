
'use strict'


var React=require('react-native');

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


var Swiper = require('react-native-swiper');


var sliderImgs = [
    'http://img01.meituncdn.com/group1/M00/44/FD/wKgyOlZPGmiABkItAALFKzvqD0o953.jpg',
    'http://img04.meituncdn.com/group1/M00/45/BC/wKgyOlZSgViAPIk_AAPq3Gp6zkU960.jpg',
    'http://img01.meituncdn.com/group1/M00/38/9D/wKgyOlYzH7-Aecy3AAEXg9gCPHs270.jpg'
];
var Slider = React.createClass({
    render: function(){
        return (
            <Swiper showsButtons={false} autoplay={true}
                    height={150} showsPagination={true}>
                <Image style={[styles.slide]} source={{uri: sliderImgs[0]}}></Image>
                <Image style={[styles.slide]} source={{uri: sliderImgs[1]}}></Image>
                <Image style={[styles.slide]} source={{uri: sliderImgs[2]}}></Image>
            </Swiper>
        );
    }
});

module.exports=Slider;

