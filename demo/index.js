
'use strict'

//依赖引入
//import React from 'react-native';
let React=require('react-native');

let Demo1Index=require('./demo1/index');
let MeitunIndex=require('./meitun/index/index');

let CanEatIndex=require('../pregnancy/can-eat/CanEatIndex/CanEatIndex.js');
let AskIndex=require('../pregnancy/ask/AskIndex/AskIndex.js');

//变量定义
let {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    }=React;

let{
    selectImageRNM,
    }=require('../bbt-react-native');

//样式定义
let css=StyleSheet.create({
    wrapper:{
        paddingTop:150,

        backgroundColor:'white',
        height:100000,

    },
    navWrapper:{
        marginTop:30,
        borderTopWidth:5,
        borderTopColor:'red',
    },
    titleText:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        color:'black',
    },
    navText:{
        color:'black',
    },

    navView:{
        borderBottomWidth:1,
        borderBottomColor:'#f5f5f5',
        padding:20,
    },

});

class DemoApp extends Component{

    //组件渲染接口
    render(){
        return(
            <Navigator
                initialRoute={{name: 'home', index: 0}}
                renderScene={ this._render_page.bind(this) }
                >
            </Navigator>
        );
    }



    //public函数 暂无





    //private函数,以下划线开头

    _render_page(route, navigator){

        if(route.page){


            return (
                <View style={{flex:1,}}>

                    <TouchableOpacity style={{backgroundColor:'white'}} onPress={()=>navigator.pop()}>
                        <View style={css.navView}>
                            <Text style={css.navText}>返回</Text>
                        </View>
                    </TouchableOpacity>

                    {route.page}
                </View>
            );

        }else if(route.name=='demo1'){
            return this._tplDemo1Index(...arguments);
        }else if(route.name=='demo2'){
            return this._tplDemo2Index(...arguments);
        }else if(route.name=='meitun'){
            return (
                <MeitunIndex nav={navigator}/>
            );
        }else if(route.name=='canEat'){
            return (
                <CanEatIndex nav={navigator}/>
            );
        }else if(route.name=='ask'){
            return (
                <AskIndex nav={navigator}/>
            );
        }else{//home
            return this._tplHome(...arguments);
        }

        return route.page;
    }


    _forward(route, navigator,routeName){
        let nextIndex = route.index + 1;
        navigator.push({
            name: routeName,
            index: nextIndex,
        });
    }

    _back(route, navigator){
        if (route.index > 0) {
            navigator.pop();
        }
    }



    //以下为tpl 页面模板部分 以下划线tpl开头[下划线表示私有] todo 是否考虑将tpl内容放到单独的js中？？

    _tplHome(route, navigator){
        return(
            <View style={css.wrapper}>
                <Text style={[css.text,css.titleText]}>react native demo </Text>

                <View style={css.navWrapper}>


                    <TouchableOpacity onPress={this._forward.bind(this,route,navigator,'demo1')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>测试demo1</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._forward.bind(this,route,navigator,'demo2')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>测试demo2</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._forward.bind(this,route,navigator,'meitun')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>美囤妈妈</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._forward.bind(this,route,navigator,'canEat')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>能不能吃</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._forward.bind(this,route,navigator,'ask')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>孕育问答</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    _tplDemo1Index(route,navigator){

        return (
            <View style={{flex:1,}}>

                <TouchableOpacity style={{backgroundColor:'white'}} onPress={this._back.bind(this,route,navigator)}>
                    <View style={css.navView}>
                        <Text style={css.navText}>返回</Text>
                    </View>
                </TouchableOpacity>

                <Demo1Index nav={navigator} style={{flex:1,}}/>
            </View>
        );

    }


    _tplDemo2Index(route,navigator){

        let Demo2Index = require('./demo2/Demo2Index/Demo2Index');

        return (
            <Demo2Index nav={navigator} />
        );

    }

}




/*let d=React.createClass({
 render(){
 return(
 <Navigator
 renderScene={ (r,nav)=><Detail nav={nav} title='测试用' productId='07030400270101' specialId='7306' /> }
 />
 );
 },
 });*/

//AppRegistry.registerComponent('AwesomeProject',()=>require('./demo1/RNM/SelectImage/SelectImage'));
//AppRegistry.registerComponent('AwesomeProject',()=>require('./meitun/Classnav/Classnav'));

/*let tmp=React.createClass({
 render(){
 return(
 <Navigator
 renderScene={ (r,nav)=><CanEatIndex nav={nav}   /> }
 />
 );
 },
 });
 AppRegistry.registerComponent('AwesomeProject',()=>tmp);*/

/*let Detail=require('../pregnancy/ask/AskDetail/AskDetail');
 let tmp=React.createClass({
 render(){
 return(
 <Navigator
 renderScene={ (r,nav)=><Detail nav={nav} title='test' data={{id:'255152',title:'刚刚测的 是怀孕了吗？明天该来例假 第二道好浅呀',}}  /> }
 />
 );
 },
 });
 AppRegistry.registerComponent('AwesomeProject',()=>tmp);*/
AppRegistry.registerComponent('AwesomeProject',()=>DemoApp);
//AppRegistry.registerComponent('AwesomeProject', () => require('./demo2/Demo2Card/Demo2Card'));

