
'use strict'


import React,{
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    StatusBarIOS,
} from 'react-native';

import Header from '../Header/Header';
import Search from '../Search/Search';
import IndexMenu from '../IndexMenu/IndexMenu';


class CanEatIndex extends Component{

    componentWillMount(){
        if(Platform.OS=='ios'){
            StatusBarIOS.setStyle('light-content');
        }

    }



    componentWillUnmount(){
        if(Platform.OS=='ios'){
            StatusBarIOS.setStyle('default');
        }
    }



    render(){

        return (

            <View style={{backgroundColor:'#efeff4',flex:1}}>

                <Header title='能不能吃' nav={this.props.nav}/>

                <Search />

                <IndexMenu />

            </View>
        );

    }


}


module.exports=CanEatIndex;


