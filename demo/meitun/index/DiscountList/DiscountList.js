
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
            curName:this.props.curName,
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

        var dataSource=this.props.root.state.dataSource.cloneWithRows(this.props.root[name].dataArray);
        this.props.root.setState({curName:name,dataSource:dataSource});

    },


});



var DiscountList=React.createClass({

    //field

    left:{
        dataArray:[],
        loading:false,
        action:'gettodayhave',
        curPage:0,
    },

    right:{
        dataArray:[{}], //有一个空值，是为了保证第一次渲染list2的时候不渲染section
        loading:false,
        action:'gettmnotice',
        curPage:0,
    },


    //状态初始化方法
    getInitialState(){
        return {
            curName:'left',
            dataSource:new ListView.DataSource({
                rowHasChanged: (r1, r2) => true
            }),
        };
    },


    //render方法
    render(){
      return (
          <ListView dataSource={this.state.dataSource} onEndReachedThreshold={155}
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
            <SectionHeader root={this} curName={this.state.curName}/>
        );
    },

    _renderRow(rowData, sectionID, rowID) {

        if(!rowData.specialid){
            return(<View></View>);
        }

        var timeText;
        if(this.state.curName=='left'){
            timeText='剩余x天';
        }else{
            timeText='距开团x小时x分钟';
        }


        var discountJsx;
        if(this.state.curName=='left'){
            if(rowData.discount){
                discountJsx=
                    <View style={[css.discountView]}>
                        <Image style={[css.discountImage]} source={require('./img/naipin.png')}/>
                        <Text style={[css.discountText]}>{rowData.discount}</Text>
                    </View>;
            }
        }else{
            discountJsx=
            <TouchableHighlight style={[css.kttxTouch]}>
                <View style={[css.kttxView]}>
                    <Text style={[css.kttxText]}>开团提醒</Text>
                </View>
            </TouchableHighlight>;
        }


        return (
            <TouchableHighlight style={[css.touch]}>
                <View>
                    <Image style={[css.image]} source={{uri:rowData.imageurl}} />
                    <View  style={[css.textView]}>
                        <Text style={[css.textText]} numberOfLines={1} >{rowData.name}</Text>
                        {discountJsx}
                    </View>
                    <View style={[css.timeView]}>
                        <Image style={[css.timeImage]} source={require('./img/time.png')}/>
                        <Text style={[css.timeText]}>{timeText}</Text>
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

        var c=this.state.curName;

        if(this[c].loading==true){
            return;
        }

        this[c].loading=true;

        var curPage=this[c].curPage+1;
        var url='http://m.meitun.com/mobile/home/'+this[c].action+'.htm?curpage='+curPage+'&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=662&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';

        fetch(url)
            .then((response) => response.json())
            .then(function(res){

                this[c].dataArray=this[c].dataArray.concat(res.speciallist);

                //alert(this.dataArray.length);

                var dataSource=this.state.dataSource.cloneWithRows(this[c].dataArray);

                //this.dataSource=this[c].dataSource;

                this[c].curPage=this[c].curPage+1;

                if(c==this.state.curName){//说明加载的时候，没有被切换过
                    this.setState({dataSource:dataSource});
                }


            }.bind(this))
            .catch((error) => {
                alert(error);
            }).done(()=>{
                this[c].loading=false;
            });
    },

});


module.exports=DiscountList;

