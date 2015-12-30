
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
            <Modal show={this.props.show}
                   onPressMask={this.props.onPressMask} >

                <View
                    style={{
                        backgroundColor:'fff',
                        width:width,
                        flexDirection:'row',
                        flexWrap:'wrap',
                    }}>


                    <TouchableOpacity>

                        <View>
                            <Text>
                                qq
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <View>
                            <Text>
                                qq
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <View>
                            <Text>
                                qq
                            </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <View>
                            <Text>
                                qq
                            </Text>
                        </View>

                    </TouchableOpacity>


                </View>


            </Modal>
        );

    }


}



module.exports=Share;



