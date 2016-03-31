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
    ViewPagerAndroid,
} from 'react-native';
import {
    LibTabBar,
} from '../../comm';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import MyAskList from '../MyAsk/MyAskList';


class MyAskTab extends Component {

    componentWillMount() {
        this.state = {
            canInit1: true,
            canInit2: false,
        };

        this._curTabIndex = 1;
    }

    render() {

        return (
            <ScrollableTabView
                renderTabBar={() => <LibTabBar />}
                tabBarUnderlineColor='#ff537b'
                tabBarActiveTextColor='#ff537b'
                tabBarInactiveTextColor='#999'
                onChangeTab={(tab) => {
                    let index = tab.i + 1;

                    if (this._curTabIndex === index) {// 修复onChangeTab会被触发多次的bug
                        return;
                    }
                    this._curTabIndex = index;

                    let name = 'canInit' + index;
                    if (this.state[name] === true) {
                        return;
                    }

                    let state = {};
                    state[name] = true;
                    this.setState(state);


                }}
                >
                <MyAskList {...this.props}
                    showBtn={true}
                    type='question' tabLabel='我的提问' canInit={this.state.canInit1}/>
                <MyAskList {...this.props}
                    showBtn={true}
                    type='answer' tabLabel='我的回答' canInit={this.state.canInit2}/>
            </ScrollableTabView>
        );

    }

}


module.exports = MyAskTab;
