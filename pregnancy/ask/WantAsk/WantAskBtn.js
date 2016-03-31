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
    Image,
    Animated,
} from 'react-native';

import WantAsk from './WantAsk';
import {
    BBUserDataRNM,
    BBPageRouterRNM,
} from '../../comm';


class WantAskBtn extends Component {

    componentWillMount() {
        this.state = {
            offset: new Animated.Value(10),
            angle: new Animated.Value(0),
        };

        this._animating = false;
    }

    componentWillReceiveProps(props2) {

        if (this.props.show === props2.show) {

            // console.log('WantAsk : props not changed. return .');
            return;
        }

        // console.log('WantAsk : props  changed show=' + props2.show);
        if (props2.show === false) {
            this._hide();
        } else {
            this._show();
        }

    }

    _show() {

        if (this._animating === true) {
            return;
        }

        this._animating = true;

        Animated.timing(
            this.state.offset,
            {toValue: 10, duration: 300, }
        ).start(() => this._animating = false);

        Animated.timing(
            this.state.angle,
            {toValue: 360, duration: 300, delay: 100}
        ).start(() => this.state.angle.setValue(0));
    }

    _hide() {

        if (this._animating === true) {
            return;
        }

        this._animating = true;

        Animated.timing(
            this.state.offset,
            {toValue: -32, duration: 300, }
        ).start(() => this._animating = false);
    }

    render() {

        return (
            <TouchableOpacity style={{
                position: 'absolute',
                left: 10,
                bottom: this.state.offset,
            }}
                onPress={() => {

                    BBUserDataRNM.isLogin().then((res) => {
                        if (res.data === false) { // 未登录
                            return BBPageRouterRNM.showLoginPage();
                        }
                    }).then(() => {
                        this.props.nav.push({
                            page: <WantAsk nav={this.props.nav} />
                        });
                    });

                }}
                >
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgba(0,0,0,.55)',
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 20,
                }}>
                    <Animated.Image source={require('./img/edit.png')}
                        style={{
                            resizeMode: 'stretch',
                            width: 32,
                            height: 32,
                            marginRight: 10,
                            transform: [
                                {rotate: this.state.angle.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ['0deg', '360deg']
                                })},
                            ],
                        }}/>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                    }}>
                        我要提问
                    </Text>
                </View>
            </TouchableOpacity>
        );

    }

}


module.exports = WantAskBtn;
