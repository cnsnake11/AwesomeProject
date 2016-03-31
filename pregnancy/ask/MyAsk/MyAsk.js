
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
    Loading,
} from '../../comm';

import Header from '../Header/Header';
import MyAskTab from '../AskTab/MyAskTab';

class MyAsk extends Component {
    render() {
        return (
            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
            >
                <Header title='我的问答' nav={this.props.nav}/>
                <MyAskTab nav={this.props.nav}/>
            </View>
        );

    }
}

module.exports = MyAsk;
