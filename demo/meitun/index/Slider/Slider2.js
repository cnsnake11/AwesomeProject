
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



 var ViewPager = require('react-native-viewpager');
 var deviceWidth = Dimensions.get('window').width;

 var IMGS = [
 'http://img01.meituncdn.com/group1/M00/44/FD/wKgyOlZPGmiABkItAALFKzvqD0o953.jpg',
 'http://img04.meituncdn.com/group1/M00/45/BC/wKgyOlZSgViAPIk_AAPq3Gp6zkU960.jpg',
 'http://img01.meituncdn.com/group1/M00/38/9D/wKgyOlYzH7-Aecy3AAEXg9gCPHs270.jpg'
 ];

 var styles = StyleSheet.create({
 page: {
 width: deviceWidth,
 },
 });

 var Slider = React.createClass({
 getInitialState: function() {
 var dataSource = new ViewPager.DataSource({
 pageHasChanged: (p1, p2) => p1 !== p2,
 });

 return {
 dataSource: dataSource.cloneWithPages(IMGS),
 };
 },

 render: function() {
 return (
 <View style={{flexDirection:'row',height:170}}>
 <ViewPager
 style={{flex:1}}
 dataSource={this.state.dataSource}
 renderPage={this._renderPage}
 isLoop={true}
 autoPlay={true}/>
 </View>
 );
 },

 _renderPage: function(data,pageID) {

 return (
 <Image
 source={{uri: data}}
 style={styles.page} />
 );
 },
 });

 module.exports=Slider;
