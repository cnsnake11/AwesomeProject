
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


class Header extends Component{

    render(){

        return (

            <View style={{backgroundColor:'white',flex:1}}>

                <Text> in header</Text>

            </View>
        );

    }


}


module.exports=Header;



