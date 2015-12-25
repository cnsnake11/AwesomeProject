
'use strict'


let React=require('react-native');
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
    ListView,
    }=React;


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



