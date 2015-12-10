


'use strict'


var React=require('react-native');
var css=require('./index.css');
var baseCss=require('../../../BbtReactNative/base/BaseCss/Base.css');

var BottomNavBar=require('./BottomNavBar/BottomNavBar');
var Header=require('../Header/Header');
var DiscountList=require('./DiscountList/DiscountList');
var Classnav=require('../Classnav/Classnav');
var Loading=require('../../../BbtReactNative/views/Loading/Loading');

var Search=require('../Search/Search');


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
    BackAndroid,
    }=React;


var MeitunIndex =React.createClass({

    getInitialState(){
        return{
            selectedName:'mtmm',
            renderPlaceholderOnly: true,
        };
    },

    render(){

        if (this.state.renderPlaceholderOnly) {
            return (
                <Loading show={true}/>
            );
        }

      return(

          <Navigator  ref='nav'
                      initialRoute={{name: 'home'}}
                      renderScene={ this._render_page.bind(this) }
              ></Navigator>

      );
    },


    componentWillMount(){
        if(Platform.OS=='ios'){
            StatusBarIOS.setStyle('light-content');
        }

        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });


        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            if(this.refs.nav){
                this.refs.nav.pop();
            }
            return true;
        });

    },




    componentWillUnmount(){
        if(Platform.OS=='ios'){
            StatusBarIOS.setStyle('default');
        }
    },

    //子页面是否加载的状态
    _loadStatus:{
        mtmm:false,
        classnav:false,
        mmd:false,
        gwc:false,
        wddd:false,
    },


    _tplBody(){
        return(
            <View style={{flex: 1}}>
                {this._tplMtmm()}
                {this._tplClassnav()}
                {this._tplMsd()}
            </View>
        );
    },

    _tplMtmm(){

        var hiddenCss='';

        if(this.state.selectedName!='mtmm'){
            //alert('in hidden css');
            hiddenCss=baseCss.hidden;
        }

        var tpl=(
            <View style={[{flex:1},hiddenCss]}>

                <DiscountList index={this}/>

            </View>
        );


        if(this._loadStatus.mtmm==false&&this.state.selectedName=='mtmm'){//第一次点到
            this._loadStatus.mtmm=true;
        }

        if(this._loadStatus.mtmm==false&&this.state.selectedName!='mtmm'){//从来没点到
            return;
        }else{//点到了 or 隐藏
            return tpl;
        }


    },

    _tplClassnav(){
        var hiddenCss='';

        if(this.state.selectedName!='classnav'){
            hiddenCss=baseCss.hidden;
        }

        var tpl=(
            <View style={[{flex:1},hiddenCss]}>
                <Classnav index={this} />
            </View>

        );


        if(this._loadStatus.classnav==false&&this.state.selectedName=='classnav'){//第一次点到
            this._loadStatus.classnav=true;
        }

        if(this._loadStatus.classnav==false&&this.state.selectedName!='classnav'){//从来没点到
            return;
        }else{//点到了 or 隐藏
            return tpl;
        }
    },

    _tplMsd(){
        var hiddenCss='';

        if(this.state.selectedName!='msd'){
            hiddenCss=baseCss.hidden;
        }

        var tpl=(
            <View style={[hiddenCss]}>
                <Text style={{color:'black'}}>免税店</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} ></TextInput>
            </View>
        );


        if(this._loadStatus.msd==false&&this.state.selectedName=='msd'){//第一次点到
            this._loadStatus.msd=true;
        }

        if(this._loadStatus.msd==false&&this.state.selectedName!='msd'){//从来没点到
            return;
        }else{//点到了 or 隐藏
            return tpl;
        }
    },


    _render_page(route, nav){
        console.log('in render page '+route.name);

        if(route.name=='home'){

            return (
               <View style={[css.wrapper]}>
                   <Header logo={true}  back={true} nav={this.props.nav}
                           rightBtn='搜索' rightBtnPress={this._search} />
                   {this._tplBody()}
                   <BottomNavBar style={{flex: 0}} index={this} />
               </View>
            );
        }


        if(!route.page){
            console.error('页面导航请求没有传入page参数.');
            return;
        }

        return (
            route.page
        );

    },

    _search(){
        var nav=this.refs.nav;
        nav.push({
            name:'search',
            page:(<Search nav={nav} />)
        });
    },
});




module.exports=MeitunIndex;