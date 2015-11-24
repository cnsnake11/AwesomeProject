
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
          <ListView dataSource={this.dataSource} onEndReachedThreshold={1}
                    renderRow={this._renderRow.bind(this)}
                    onEndReached={this._dealEnd.bind(this)}
                    renderHeader={this._renderHeader}
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

    _getData(){

        if(this.loading==true){
            return;
        }

        this.loading=true;

        var url='http://www.meitun.com/discountstatic?callback=&discountLoadcount='+(this.state.curPage+1)+'&_=1448266633158';

        fetch(url)
            .then((response) => response.text())
            .then(function(responseText){

                //todo responseText is null

                //去掉外括号
                var resStr=responseText.substring(1,responseText.length);
                resStr=resStr.substring(0,resStr.length-1);

                this.dataArray=this.dataArray.concat(JSON.parse(resStr).data);

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


    _renderRow(rowData, sectionID, rowID) {

        var url=rowData.rightImage||rowData.leftImage;

        return (
            <TouchableHighlight>
                <Image style={[css.image]}
                       source={{uri:url}} />
            </TouchableHighlight>
        );
    },


    _dealEnd(){

        //alert('in end');
        this._getData();

    },


});


module.exports=DiscountList;

