
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



var Slider = React.createClass({

    imgs:[],

    getInitialState(){
        return {
            isLoading:true,
        };
    },


    render: function(){

        var jsx;
        if(this.state.isLoading==true){
            jsx=(
                <View>
                    <Text>加载中.....</Text>
                </View>
            );
        }else{
            jsx=(
                <Swiper showsButtons={false} autoplay={true}
                        height={160} showsPagination={true}>
                    {this._tplImg()}
                </Swiper>
            );
        }

        return jsx;
    },


    componentWillMount(){
        var url='http://m.meitun.com/mobile/home/getgg.htm?oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=662&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';

        fetch(url)
            .then((response) => response.json())
            .then(function(res){

                    this.imgs=res.urls;
                    //alert(res.urls[0].imageurl);
                    this.setState({isLoading:false});
                }.bind(this));
    },


    _tplImg(){
        var r=[];
        for(let i=0;i<this.imgs.length;i++){
            r.push(<Image style={[styles.slide]} source={{uri: this.imgs[i].imageurl}}></Image>);
        }
        return r;
    },
});

module.exports=Slider;

