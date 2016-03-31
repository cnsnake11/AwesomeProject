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
    ListViewBindUrl,
} from '../../comm';

import Header from '../Header/Header';
import AskTopTab from '../AskTab/AskTopTab';
import AskRule from '../AskRule/AskRule';

class AskTop extends Component {
    render() {

        return (
            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
            >
                <Header title='排行榜' nav={this.props.nav}
                        rightBtn='规则'
                        rightBtnPress={() => {
                            this.props.nav.push({
                                page: <AskRule nav={this.props.nav}/>
                            });
                        }}
                />
                <AskTopTab nav={this.props.nav} />
            </View>
        );

    }

}

module.exports = AskTop;
