
'use strict';

import React, {
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
    BackAndroid,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';


import {
    BaseLogicObj,
    AnimatedView,
} from '../../../bbt-react-native';


class Main extends Component {

    render() {

        let winW = Dimensions.get('window').width;
        let winH = Dimensions.get('window').height;

        let offset = 0;
        if (Platform.OS === 'android') {
            offset = 20;
        }


        return (
                <View style={{flex: 1, }}>


                    <View style={{position: 'absolute', top: 100, width: winW, }}>
                        <AnimatedView index={1}>
                        <Text style={{color: '#fff', fontSize: 24, textAlign: 'center', paddingBottom: 10}}>
                            RN的奇思妙想</Text>
                        </AnimatedView>
                        <AnimatedView index={3}>
                        <Text style={{color: '#BEE8FA', fontSize: 14, textAlign: 'center'}}>
                        使用React Native开发的好玩的动画效果</Text>
                        </AnimatedView>
                    </View>


                    <View style={{position: 'absolute', bottom: 30 + offset, right: 30,
                    justifyContent: 'flex-end', alignItems: 'flex-end'}}>

                        <AnimatedView index={5}>
                        <TouchableOpacity style={{backgroundColor: '#fff', padding: 12,
                        paddingLeft: 25, paddingRight: 25}}
                            onPress={() => this.props.obj.showLogin()}>
                            <Text style={{color: '133D50', fontSize: 14}}>登 录</Text>
                        </TouchableOpacity>
                        </AnimatedView>

                        <AnimatedView index={7}>
                        <TouchableOpacity onPress={() => this.props.obj.showSignIn()}>
                            <Image source={require('./img/sign_in_bg.png')}
                                   style={{width: 200, height: 44, padding: 13,
                        paddingLeft: 25, paddingRight: 25}}>
                                <Text style={{textAlign: 'right', color: '#8DADE7', fontSize: 12}}>没有账号？
                                    <Text style={{color: '#fff', fontSize: 14}}>注 册</Text></Text>
                            </Image>
                        </TouchableOpacity>
                        </AnimatedView>
                    </View>
                </View>

        );

    }

}


module.exports = Main;
