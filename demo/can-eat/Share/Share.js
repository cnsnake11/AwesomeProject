
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
    Dimensions,
} from 'react-native';


import {
    BaseLogicObj,
    Loading,
    Modal,
} from '../../../bbt-react-native';


class Share extends Component{

    render(){

        const width=Dimensions.get('window').width;

        return (
            <Modal show={this.props.show} >

                <View
                    style={{
                        backgroundColor:'fff',
                        width:width,
                        flexDirection:'row',
                        flexWrap:'wrap',
                        padding:10,
                        justifyContent:'space-between',
                    }}>

                    <View
                        style={{
                            width:width-20,
                        }}
                        >
                        <Text
                            style={{
                                textAlign:'center',
                                fontSize:16,
                                marginBottom:20,
                            }}
                            >
                            分享
                        </Text>

                    </View>

                    <TouchableOpacity>

                        <View
                            style={{
                                backgroundColor:'#3AB54A',
                                padding:10,
                                marginBottom:10,
                            }}
                            >
                            <Text
                                style={{
                                    color:'fff',
                                }}
                                >
                                微信
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <View
                            style={{
                                backgroundColor:'#F7941D',
                                padding:10,
                                marginBottom:10,
                            }}
                            >
                            <Text
                                style={{
                                    color:'fff',
                                }}
                                >
                                朋友圈
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <View
                            style={{
                                backgroundColor:'#0E76BD',
                                padding:10,
                                marginBottom:10,
                            }}
                            >
                            <Text
                                style={{
                                    color:'fff',
                                }}
                                >
                                QQ
                            </Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity>

                        <View
                            style={{
                                backgroundColor:'#92278F',
                                padding:10,
                                marginBottom:10,
                            }}
                            >
                            <Text
                                style={{
                                    color:'fff',
                                }}
                                >
                                QQ空间
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <View
                            style={{
                                backgroundColor:'#25AAE2',
                                padding:10,
                                marginBottom:10,
                            }}
                            >
                            <Text
                                style={{
                                    color:'fff',
                                }}
                                >
                                新浪微博
                            </Text>
                        </View>

                    </TouchableOpacity>



                    <TouchableOpacity
                            onPress={this.props.onPressCancel}
                            style={{
                                marginTop:10,
                            }}
                        >
                        <View
                            style={{
                                width:width-20,
                                padding:10,
                                backgroundColor:'#B3B5B4',
                            }}
                            >
                            <Text
                                style={{
                                    textAlign:'center',
                                    fontSize:16,
                                    color:'fff',
                                }}
                                >
                                取消
                            </Text>

                        </View>
                    </TouchableOpacity>

                </View>


            </Modal>
        );

    }


}


module.exports=Share;



