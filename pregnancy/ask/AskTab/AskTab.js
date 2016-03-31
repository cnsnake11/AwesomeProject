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
import AskList from '../AskList/AskList';
import {
    LibTabBar,
} from '../../comm';

class AskTab extends Component {

    componentWillMount() {
        this.state = {
            canInit1: true,
            canInit2: false,
            canInit3: false,
        };

        this._curTabIndex = 1;
    }

    shouldComponentUpdate(nextProps, nextState) { // 此处算法是为了保证tab滑动的流畅性

        if (this.state.canInit1 === nextState.canInit1 &&
            this.state.canInit2 === nextState.canInit2 &&
            this.state.canInit3 === nextState.canInit3) {
            return false;
        }

        return true;
    }


    render() {

        return (
            <ScrollableTabView
                renderTabBar={() => <LibTabBar />}
                style={{
                    backgroundColor: '#fcf8f5',
                }}
                tabBarUnderlineColor='#ff537b'
                tabBarBackgroundColor='#fff'
                tabBarActiveTextColor='#ff537b'
                tabBarInactiveTextColor='#999'
                onChangeTab={(tab) => {
                    let index = tab.i + 1;

                    if (this._curTabIndex === index) {// 修复onChangeTab会被触发多次的bug
                        return;
                    }
                    this._curTabIndex = index;

                    let name = 'canInit' + index;

                    if (this.props.onChangeTab) {

                        // 延时执行是为了优化动画 保证tab转场先切换完，再做ui更新动作
                        setTimeout(() => {
                            this.props.onChangeTab(tab);
                            if (this.state[name] === true) {
                                return;
                            }

                            let state = {};
                            state[name] = true;
                            this.setState(state);

                        }, 300);
                    }


                }}
                >
                <AskList {...this.props} animateRowMaxRowNum={8}
                    showBtn={true}
                    act='birth' tabLabel='同龄' canInit={this.state.canInit1}/>
                <AskList {...this.props}
                    showBtn={true}
                    act='new' tabLabel='最新' canInit={this.state.canInit2}/>
                <AskList {...this.props}
                    showBtn={false}
                    act='well' tabLabel='精选' canInit={this.state.canInit3}/>
            </ScrollableTabView>
        );

    }

}


module.exports = AskTab;
