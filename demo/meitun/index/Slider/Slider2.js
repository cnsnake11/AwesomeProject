
'use strict'


var React=require('react-native');
var Loading=require('../../../../bbt-react-native/views/Loading/Loading');

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
var deviceWidth = Dimensions.get('window').width;



var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height:160,
    },
});

var Slider = React.createClass({

    getInitialState: function() {

        return {
            isLoading:true,
        };
    },

    ds:null,

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

                var dataSource = new ViewPager.DataSource({
                    pageHasChanged: () => true,
                });
                this.ds=dataSource.cloneWithPages(res.urls);

                this.setState({isLoading: false});

            }.bind(this));
    },

    render: function() {
        var jsx;
        if(this.state.isLoading==true){
            jsx=(
                <Loading show={true}  style={{height:160}} />
            );
        }else{
            jsx=(
                <View style={{flexDirection:'row',height:160}}>
                    <ViewPager
                        style={{flex:1}}
                        dataSource={this.ds}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                </View>
            );
        }

        return jsx;


    },

    _renderPage: function(data,pageID) {

        return (
            <Image
                source={{uri: data.imageurl}}
                style={styles.page} />
        );
    },
});

module.exports=Slider;
