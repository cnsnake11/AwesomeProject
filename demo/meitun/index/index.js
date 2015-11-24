


'use strict'


var React=require('react-native');
var BottomNavBar=require('./BottomNavBar/BottomNavBar');
var css=require('./index.css');
var DiscountList=require('./DiscountList/DiscountList');

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
    }=React;


var MeitunIndex =React.createClass({

    getInitialState(){
        return{
            selectedName:'mtmm'
        };
    },

    render(){

        //这里直接把flex定义在了模板上，是因为就是为这个页面用的，而且属性就一个flex，
      return(

          <View style={[css.wrapper]}>
              {this._tplHeader()}
              {this._tplBody()}
              {this._tplFooter()}
          </View>

      );
    },

    componentWillMount(){
        if(Platform.OS=='ios'){
            StatusBarIOS.setStyle('light-content');
        }
    },
    componentWillUnmount(){
        if(Platform.OS=='ios'){
            StatusBarIOS.setStyle('default');
        }
    },

    //子页面是否加载的状态
    _loadStatus:{
        mtmm:false,
        ms:false,
        mmd:false,
        gwc:false,
        wddd:false,
    },


    _tplHeader(){
        //这里没有封装组件，因为没有复用价值而且代码量也不大
        return (
            <View style={[css.titleView,{flex: 0},React.Platform.OS=='ios'?css.iosTitleView:'']}>
                <Image style={[css.titleLogoImage]}
                       source={require('./img/logo.png')} ></Image>
                <TouchableHighlight style={[css.titleSearchTouch]} underlayColor='#1ca9bd' >
                    <Text style={[css.titleSearchText]}>搜索</Text>
                </TouchableHighlight>
            </View>
        );

    },

    _tplBody(){
        return(
            <View style={{flex: 1}}>

                {this._tplMtmm()}
                {this._tplMs()}
                {this._tplMsd()}

            </View>
        );
    },

    _tplMtmm(){

        var hiddenCss='';

        if(this.state.selectedName!='mtmm'){
            //alert('in hidden css');
            hiddenCss=css.hiddenCss;
        }

        var tpl=(
            <View style={[hiddenCss,{flex:1}]}>


                <DiscountList/>

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

    _tplMs(){
        var hiddenCss='';

        if(this.state.selectedName!='ms'){
            hiddenCss=css.hiddenCss;
        }

        var tpl=(
            <View style={[hiddenCss]}>
                <Text style={{color:'black'}}>秒杀</Text>
                <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} ></TextInput>
            </View>
        );


        if(this._loadStatus.ms==false&&this.state.selectedName=='ms'){//第一次点到
            this._loadStatus.ms=true;
        }

        if(this._loadStatus.ms==false&&this.state.selectedName!='ms'){//从来没点到
            return;
        }else{//点到了 or 隐藏
            return tpl;
        }
    },

    _tplMsd(){
        var hiddenCss='';

        if(this.state.selectedName!='msd'){
            hiddenCss=css.hiddenCss;
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

    _tplFooter(){
        return (
            <BottomNavBar style={{flex: 0}} index={this} />
        );
    },
});


module.exports=MeitunIndex;