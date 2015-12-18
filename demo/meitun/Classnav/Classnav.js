'use strict'


let React=require('react-native');
let css=require('./Classnav.css');
let ClassParent=require('./ClassParent');
let ClassChild=require('./ClassChild');
let BbtRN=require('../../../bbt-react-native');
let Result=require('../Search/Result');

let {
    BaseLogicObj,
    Loading,
    }=BbtRN;

let {
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


let Root=React.createClass({


    getInitialState(){
        return{
            animationFinish: false,//动画是否完成
            data:null,
            loadingChild:false,//是否正在加载子分类

            curIndex:0,
        };
    },

    render(){


        if (this.state.animationFinish==false||this.state.data==null) {

            //动画未完成 或 数据未加载
            return (
                <Loading show={true} />
            );
        }


        return (


            <View style={[css.wrapper]}>
                <View style={[css.left]}>
                    <ClassParent onPress={this.parentObj.press.bind(this.parentObj)}
                        curIndex={this.state.curIndex}
                        data={this.state.data}      />
                </View>
                <View style={[css.right]}>
                    <ClassChild onPress={this.childObj.press.bind(this.childObj)}
                        loading={this.state.loadingChild}
                        data={this.state.data[this.state.curIndex].childs}
                        />
                </View>
            </View>

        );


    },

    componentWillMount(){

        this.parentObj=new ParentObj(this);
        this.childObj=new ChildObj(this);

        this.parentObj._getData();

        InteractionManager.runAfterInteractions(() => {
            this.setState({animationFinish: true});
        });

    },




});



class ParentObj extends BaseLogicObj{


    press(pid,index){
        if(index==this.getState().curIndex){
            return;
        }
        this.setState({curIndex:index});
        this._getData(pid,index);
    }


    _getData(pid,index){

        this.setState({loadingChild:true});

        let allData=this.getState().data;
        if(allData&&allData[index].childs&&allData[index].childs.length>0){
            console.log('数据请求过了，不发请求.');
            this.setState({loadingChild:false});
            return;
        }

        let url;

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

                this.setState({loadingChild:false});

                if(!pid){//第一次装载，会有外层数据
                    this.setState({data:res.data.frontcategorys});
                }else{

                    if(index!=this.getState().curIndex){
                        console.log('成功获得返回数据，但是当前页已经切换了，不进行view渲染操作....pid='+pid);
                        return;
                    }

                    let data=this.getState().data;
                    data[index].childs=res.data.frontcategorys;
                    this.setState({data:data});
                }

                console.log('加载数据成功....pid='+pid);

            });
    }
}

class ChildObj extends BaseLogicObj{

    press(data){

        let id=data.id;
        let name=data.name;
        let nav=this.getProps().index.refs.nav;


        let router={
            'name':'result',
            'page':(
                <Result  nav={nav} fcategoryid={id} title={name} />
            ),
        };
        nav.push(router);


    }
}

module.exports=Root;