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
    Image,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ViewPagerAndroid,
    InteractionManager,
    Dimensions,
    ScrollView,
} from 'react-native';

import {
    AnimatedView,
} from '../../comm';


class AskUserInfo extends Component {

    render() {

        let data = this.props.data;

        return (
            <View style={[this.props.style, {
                flexDirection: 'row',
                alignItems: 'center',
            }]}>
                <Image
                    source={{
                        uri: data.avatar,
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                    }}
                    />
                <View style={{
                    flex: 1,
                    paddingLeft: 10,
                }}>
                    <Text style={{
                        color: '#ff848a',
                        fontSize: 14,
                    }}>{data.nickname}</Text>
                    {
                        Platform.OS === 'ios' ?
                            <View style={{height: 5}}/>
                            :
                            null
                    }
                    <Text style={{
                        color: '#999',
                        fontSize: 12,
                    }}>{(!data.babyAge || data.babyAge === '还没有') ? '备孕' : data.babyAge}</Text>
                </View>

                {
                    this.props.img === 'yijiejue' ?
                        <AnimatedView type='fromLeft' delay={300} index={0} >
                        <Image source={require('./img/yijiejue.png')}
                               style={{
                                   marginTop: 5,
                                   marginRight: 5,
                               }}/>
                        </AnimatedView>
                        :
                        null
                }

                {
                    this.props.img === 'zuijia' ?
                        <AnimatedView type='fromLeft' delay={300} index={1}>
                        <Image source={require('./img/zuijia.png')}
                               style={{
                                   marginTop: 5,
                                   marginRight: 5,
                               }}/>
                        </AnimatedView>
                        :
                        null
                }


                {
                    this.props.bestBtn === true ?
                        <TouchableOpacity
                            onPress={() => this.props.bestBtnPress()}
                            style={{
                                position: 'relative',
                                top: -10,
                            }}
                            >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                >
                                <Text
                                    style={{
                                        color: '#ff537b',
                                    }}
                                    >
                                    ✓ 选为最佳
                                </Text>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                }





            </View>
        );
    }
}

module.exports = AskUserInfo;
