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

import ScrollableTabView from 'react-native-scrollable-tab-view';
import AskTopList from '../AskTop/AskTopList';
import {
    LibTabBar,
} from '../../comm';

class AskTopTab extends Component {

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
                <AskTopList {...this.props}
                    showBtn={true}
                    type='day' tabLabel='当日排行榜' canInit={this.state.canInit1}/>
                <AskTopList {...this.props}
                    showBtn={true}
                    type='week' tabLabel='积分排行榜' canInit={this.state.canInit2}/>
            </ScrollableTabView>
        );

    }

}


module.exports = AskTopTab;
