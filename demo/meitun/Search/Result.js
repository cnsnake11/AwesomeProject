
'use strict'


var React=require('react-native');
var css=require('./Result.css');
var baseCss=require('../../../bbt-react-native/base/BaseCss/Base.css');
var ListViewBindUrl=require('../../../bbt-react-native/views/ListViewBindUrl/ListViewBindUrl');
var ResultTab=require('./ResultTab');
var Header=require('../Header/Header');
var Filter=require('./Filter');
var TabApi=require('../../../bbt-react-native/api/TabApi/TabApi');
var Detail=require('../Detail/Detail');
var BbtRN=require('../../../bbt-react-native');


var {
    BaseLogicObj,
    }=BbtRN;


var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    }=React;


var Result =React.createClass({

    getInitialState(){

        return {
            curName:'mr',//当前tab页名
            brandList:[],//品牌列表


            showYh:false, //filter中【只显示有货】的switch
            curBtnId:''//filter中当前选中的品牌id
        };

    },


    componentWillMount(){

        this.listObj=new ListObj(this);
        this.tabObj=new TabObj(this);
        this.filterObj=new FilterObj(this);

    },


    render(){


        return (

            <View style={[{flex:1},css.wrapper]}>

                <Header back={true} title={this.props.title} rightBtn=' ' nav={this.props.nav} />

                <ResultTab onPress={this.tabObj.press.bind(this.tabObj)}
                           tabApi={this.tabObj.tabApi} />

                <ListViewBindUrl ref='list'
                                 style={[this.state.curName=='sx'?baseCss.hidden:'']}
                                 renderRow={this.listObj.renderRow.bind(this.listObj) }
                                 getUrl={this.listObj.getUrl.bind(this.listObj)}
                                 getData={this.listObj.getData.bind(this.listObj)}/>

                <Filter showYh={this.state.showYh}
                        brandList={this.state.brandList}
                        onChangeSwitch={this.filterObj.changeSwitch.bind(this.filterObj)}

                        pressOk={this.filterObj.pressOk.bind(this.filterObj)}
                        pressCancel={this.filterObj.pressCancel.bind(this.filterObj)}
                        pressBrand={this.filterObj.pressBrand.bind(this.filterObj)}

                        curBtnId={this.state.curBtnId}

                    style={[this.state.curName=='sx'?'':baseCss.hidden]}
                    result={this} ref='filter' />

            </View>

        );
    },



});





//业务逻辑对象 start ------------------------

class FilterObj extends BaseLogicObj{

    changeSwitch(v){
        this.setState({showYh:v});
    }



    pressOk(){
        var brandId=this.getState().curBtnId;
        this.root.tabObj.closeSx();
        this.getRefs().list.reload();
    }


    pressCancel(){
        this.setState({curBtnId:null});
    }



    pressBrand(id){
        this.setState({curBtnId:id});
    }


}


class TabObj extends BaseLogicObj{


    constructor(root){

        super(root);

        this.tabApi=new TabApi(
            {
                curName:this.getState().curName
            }
        );
    }

    press(name){

        if(name=='sx'){
            this._pressSx();
        }else{
            this._pressOther(name);
        }



    }


    _pressSx(){
        var tabApi=this.tabApi;

        if(!tabApi.isCur('sx')){

            this._storeName=this.getState().curName;//当前缓存的list的name

            tabApi.clicked('sx');
            this.setState({
                curName:'sx',
            });

        }else{//点的自己

            this.closeSx();
        }

    }


    _pressOther(name){

        var tabApi=this.tabApi;

        if(tabApi.isCur(name)){//点的自己
            this.getRefs().list.getScrollResponder().scrollTo(0);
            return;
        }

        tabApi.clicked(name);
        this.setState({
            curName:name,
        });


        if(this._storeName!=name){//缓存的不是自己

            this._storeName=null;

            //todo 这种直接调用接口的代码，而不是使用state来触发渲染的方式，还需要思考差异
            this.getRefs().list.reload();
        }

    }


    closeSx(){

        this.tabApi.clicked(this._storeName);

        this.setState({
            curName:this._storeName,
        });

    }


}


class ListObj extends BaseLogicObj{


    constructor(root){

        super(root);

        this._sortId={
            'mr':'',
                'xl':'SALES_COUNT_DESC',
                'jg':'SALES_PRICE_ASC',
        }
    }


    getUrl(curPage){

        var keywords=null;
        if(this.getProps().keyWord){
            keywords=encodeURI(this.getProps().keyWord);
        }

        var fcategoryid=null;
        if(this.getProps().fcategoryid){
            fcategoryid=this.getProps().fcategoryid;
        }

        var url= 'http://m.meitun.com/mobile/search.htm?curpage='+(curPage+1)+'&keywords='+keywords+'&fcategoryid='+fcategoryid+'&oem=IOS&osversion=8.0%20&screenwidth=375&screenheight=627&apptype=1&appversion=1.0.1&nettype=unknown&regcode=250&provcode=264&partner=babytree';


        var curBtnId=this.getState().curBtnId;

        if(curBtnId){
            url=url+'&brandid='+curBtnId;
        }


        return url+'&sortfield='+this._sortId[this.getState().curName];
    }

    getData(res){
        this.setState({brandList:res.data.queries[0].value});
        return res.data.items;
    }

    renderRow(rowData, sectionID, rowID){
        return (


            <TouchableOpacity onPress={this.press.bind(this,rowData)} >

                <View style={[css.listRowView]}>
                    <View style={[css.listLeftView]}>
                        <Image style={[css.listImage]}  source={{uri:rowData.picture}} />
                    </View>

                    <View style={[css.listRightView]}>

                        <View style={[css.topView]}>
                            <Text>{rowData.itemname}</Text>
                        </View>

                        <View style={[css.bottomView]}>

                            <View  style={[css.bottomView1]}>
                                <Text style={[css.text1,css.newPrice]}>¥{rowData.topicprice}</Text>
                                <Text style={[css.text1,css.oldPrice]}>{rowData.saleprice}</Text>
                                <Text style={[css.text1,css.discount]}>{rowData.discount}折</Text>
                            </View>

                            <View  style={[css.bottomView2]}>
                                <Text style={[css.salescount]}>{rowData.salescount}人已囤</Text>
                            </View>

                        </View>



                    </View>
                </View>

            </TouchableOpacity>

        );
    }



    press(data){

        var nav=this.getProps().nav;

        nav.push(
            {
                name:'detail',
                page:(
                    <Detail nav={nav} productId={data.sku} title={data.itemname} specialId={data.topicid}/>
                ),
            }
        );

    }
}







module.exports=Result;