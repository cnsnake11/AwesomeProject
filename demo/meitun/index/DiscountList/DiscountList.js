
'use strict'


var React=require('react-native');
var Slider=require('../Slider/Slider');
var css=require('./DiscountList.css');

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
    ListView,
    }=React;


var SectionHeader=React.createClass({
    //todo 这里也可以封装出去，但是考虑到强耦合没有复用价值，代码量也不大，就没有封装出去。

    getInitialState(){
        return({
            curName:'left',
        });
    },


    render(){

        var leftActiveCss='';
        var rightActiveCss='';
        var leftSectionBottomBorderView;
        var rightSectionBottomBorderView;
        if(this.state.curName=='left'){
            leftActiveCss=css.sectionActiveText;
            leftSectionBottomBorderView=(<View style={[css.sectionBottomBorderView]}></View>);
        }else{
            rightActiveCss=css.sectionActiveText;
            rightSectionBottomBorderView=(<View style={[css.sectionBottomBorderView]}></View>);
        }

        return(
            <View style={[css.sectionWrapperView]}>
                <TouchableHighlight underlayColor={'white'}
                                    style={[css.sectionTouch]} onPress={this._press.bind(this,'left')}>
                    <View style={[css.sectionCellView]}>
                        <Text style={[css.sectionTopText,leftActiveCss]}>今日特卖</Text>
                        <Text style={[css.sectionBottomText,leftActiveCss]}>Today‘s Special</Text>
                        {leftSectionBottomBorderView}
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'white'}
                                    style={[css.sectionTouch]}  onPress={this._press.bind(this,'right')}>
                    <View style={[css.sectionCellView]}>
                        <Text style={[css.sectionTopText,rightActiveCss]}>即将上线</Text>
                        <Text style={[css.sectionBottomText,rightActiveCss]}>Preview</Text>
                        {rightSectionBottomBorderView}
                    </View>
                </TouchableHighlight>
            </View>
        );
    },



    _press(name){
        if(this.state.curName==name){
            return;
        }
        this.setState({curName:name});
    },


});



var DiscountList=React.createClass({

    //field
    dataArray:[],
    dataSource : new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.brandId !== r2.brandId
}),
    loading:false,


    //状态初始化方法
    getInitialState(){
        return {
            curPage:0,
        };
    },


    //render方法
    render(){
      return (
          <ListView dataSource={this.dataSource} onEndReachedThreshold={155}
                    renderRow={this._renderRow.bind(this)}
                    onEndReached={this._dealEnd.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
              />
      );
    },


    //生命周期事件
    componentWillMount(){

        this._getData();

    },


    //私有方法
    _renderHeader(){
        return (
            <Slider/>
        );
    },

    _renderSectionHeader(sectionData, sectionID){

        return(
            <SectionHeader/>
        );
    },

    _renderRow(rowData, sectionID, rowID) {

        return (
            <TouchableHighlight style={[css.touch]}>
                <View>
                    <Image style={[css.image]} source={{uri:rowData.imageurl}} />
                    <View  style={[css.textView]}>
                        <Text>{rowData.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },



    _dealEnd(){

        //alert('in end');
        this._getData();

    },


    _getData(){

        if(this.loading==true){
            return;
        }

        this.loading=true;

        var url='http://m.meitun.com/mobile/home/gettodayhave.htm?curpage='+(this.state.curPage+1)+'&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=662&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';

        fetch(url)
            .then((response) => response.json())
            .then(function(res){

                //todo responseText is null

                this.dataArray=this.dataArray.concat(res.speciallist);

                //alert(this.dataArray.length);

                this.dataSource=this.dataSource.cloneWithRows(this.dataArray);

                this.setState({curPage:this.state.curPage+1});

            }.bind(this))
            .catch((error) => {
                alert(error);
            }).done(()=>{
                this.loading=false;
            });
    },


});


module.exports=DiscountList;

