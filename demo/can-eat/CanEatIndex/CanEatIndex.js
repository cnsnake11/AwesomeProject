
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
} from 'react-native';

import Header from '../Header/Header';




class CanEatIndex extends Component{

    render(){

        return (

            <View style={{backgroundColor:'white',flex:1}}>

                <Header />

                 <Text> in can eat index</Text>

            </View>
        );

    }


}


module.exports=CanEatIndex;


