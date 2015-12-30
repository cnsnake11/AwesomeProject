
'use strict'

//依赖引入
//import React from 'react-native';
let React=require('react-native');
//let UIExplorer=require('../Examples/UIExplorer/UIExplorerApp');
let MoviesApp=require('../Examples/Movies/MoviesApp');

let Demo1Index=require('./demo1/index');
let MeitunIndex=require('./meitun/index/index');

let CanEatIndex=require('./can-eat/CanEatIndex/CanEatIndex.js');


//变量定义
let {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    Platform,
    }=React;

//样式定义
let css=StyleSheet.create({
    wrapper:{
        paddingTop:150,

        backgroundColor:'white',//三星中画布背景色为黑色
        height:100000,//三星中画布背景色为黑色

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
        color:'black',//三星中默认颜色为灰色
    },
    navText:{
        color:'black',//三星中默认颜色为灰色
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

                    <TouchableHighlight style={{backgroundColor:'white'}} onPress={()=>navigator.pop()}>
                        <View style={css.navView}>
                            <Text style={css.navText}>返回</Text>
                        </View>
                    </TouchableHighlight>

                    {route.page}
                </View>
            );

       }else if(route.name=='UIExplorer'){

            //这种很简单的结构，没有必要为了封装而封装
            return (//官方给的例子没法加返回按钮，会报错 todo ios会有warning，影响调试
                /*<UIExplorer/>*/
                null
            );

        }else if(route.name=='movies'){

            return (
                <MoviesApp />
            );

        }else if(route.name=='demo1'){
            return this._tplDemo1Index(...arguments);
        }else if(route.name=='meitun'){
            return (
                <MeitunIndex nav={navigator}/>
            );
        }else if(route.name=='canEat'){
           return (
               <CanEatIndex nav={navigator}/>
           );
       }else{//home
            return this._tplHome(...arguments);
        }
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
                    <TouchableHighlight onPress={this._forward.bind(this,route,navigator,'UIExplorer')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>UIExplorer-官方提供</Text>
                        </View>
                    </TouchableHighlight>


                    <TouchableHighlight onPress={this._forward.bind(this,route,navigator,'movies')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>Movies-官方提供</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this._forward.bind(this,route,navigator,'demo1')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>测试demo1</Text>
                        </View>
                    </TouchableHighlight>


                    <TouchableHighlight onPress={this._forward.bind(this,route,navigator,'meitun')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>美囤妈妈</Text>
                        </View>
                    </TouchableHighlight>



                    <TouchableHighlight onPress={this._forward.bind(this,route,navigator,'canEat')}>
                        <View style={css.navView}>
                            <Text style={css.navText}>能不能吃</Text>
                        </View>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }

    _tplDemo1Index(route,navigator){

        return (
            <View style={{flex:1,}}>

                <TouchableHighlight style={{backgroundColor:'white'}} onPress={this._back.bind(this,route,navigator)}>
                    <View style={css.navView}>
                        <Text style={css.navText}>返回</Text>
                    </View>
                </TouchableHighlight>

                <Demo1Index nav={navigator} style={{flex:1,}}/>
            </View>
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

//AppRegistry.registerComponent('AwesomeProject',()=>require('./demo1/todolist/TodoListIndex'));
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

let Detail=require('./can-eat/Detail/Detail');
let tmp=React.createClass({
    render(){
        return(
            <Navigator
                renderScene={ (r,nav)=><Detail nav={nav} title='test' id='720'  /> }
                />
        );
    },
});
AppRegistry.registerComponent('AwesomeProject',()=>tmp);



//AppRegistry.registerComponent('AwesomeProject',()=>DemoApp);
