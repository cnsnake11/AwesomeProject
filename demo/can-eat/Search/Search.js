
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
    TextInput,
    Image,
} from 'react-native';





class Search extends Component{



    render(){

        return (

            <View style={{backgroundColor:'white',padding:10,}}>

               <TextInput
                   style={{ borderColor:'#ff537b',
                            borderWidth:1,
                            height:28,
                            borderRadius:10,
                            backgroundColor:'#fff',
                            padding:0,
                            paddingLeft:35,}}

                   placeholder='输入食物，了解能不能吃'
                   />

                <Image
                    style={{position:'absolute',
                            top:2,
                            left:20,
                            width:20,
                            resizeMode:'contain',
                            backgroundColor:'transparent',}}
                    source={require('./img/search.png')}
                    />

            </View>
        );

    }


}


module.exports=Search;


