
'use strict'


var React=require('react-native');
var Loading=require('../../../../BbtReactNative/views/Loading/Loading');

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


                <Loading show={true}  style={{height:160}} />
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


    shouldComponentUpdate(){
        if(this.state.isLoading==false){
            return false;
        }else{
            return true;
        }
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
            r.push(<Image key={'imgKey_'+i} style={[styles.slide]} source={{uri: this.imgs[i].imageurl}}></Image>);
        }
        return r;
        //image 上加key请参考【http://facebook.github.io/react/docs/multiple-components.html#dynamic-children】
    },
});

module.exports=Slider;

