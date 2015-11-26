'use strict'


var React=require('react-native');
var css=require('./Classnav.css');
var ClassParent=require('./ClassParent');
var ClassChild=require('./ClassChild');

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
    Animated,
    LayoutAnimation,
    InteractionManager,
    }=React;


var Classnav=React.createClass({


    getInitialState(){
        return{
            animationFinish: false,//动画是否完成
            data:null,
        };
    },

    render(){


        if (this.state.animationFinish==false||this.state.data==null) {
            //动画未完成 或 数据未加载
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>classnav 加载中 ....</Text>
                </View>
            );
        }


        return (


            <View style={[css.wrapper]}>
                <View style={[css.left]}>
                    <ClassParent classNav={this} ref={'classParent'}/>
                </View>
                <View style={[css.right]}>
                    <ClassChild classNav={this} ref='classChild'/>
                </View>
            </View>

        );


    },

    componentWillMount(){

        this._getData();

        InteractionManager.runAfterInteractions(() => {
            this.setState({animationFinish: true});
        });

    },


    _getData(pid,index){

        var url;

        if(pid){
            url=url+'&parentid='+pid;
            url='http://m.meitun.com/mobile/search/getchildtreebycategoryid.htm?parentid='+pid+'&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=627&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';
            console.log('加载数据....pid='+pid);
        }else{
            url='http://m.meitun.com/mobile/search/getfirstfrontcategory.htm?undefined&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=627&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';
            console.log('开始第一次加载数据....');
        }


        fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                //alert(res.data.frontcategorys.length);

                if(!pid){//第一次装载，会有外层数据
                    this.setState({data:res.data.frontcategorys});
                }else{
                    var data=this.state.data;
                    data[index].childs=res.data.frontcategorys;
                    this.setState({data:data.slice(0)});
                }

                console.log('加载数据成功....pid='+pid);

            })
            .done(()=>{

            });
    },

});

module.exports=Classnav;