'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    StatusBarIOS,
    Dimensions,
    Image,
    Animated,
} from 'react-native';


import {
    Modal,
    BBUserDataRNM,
    BBPageRouterRNM,
    BBTNavigator,
    Mask,
} from '../../comm';

import Header from '../Header/Header';
import AskTab from '../AskTab/AskTab';
import WantAskBtn from '../WantAsk/WantAskBtn';
import AskIndexObj from './AskIndexObj';
import AskTop from '../AskTop/AskTop';
import AskMyMsg from '../AskMyMsg/AskMyMsg';
import MyAsk from '../MyAsk/MyAsk';

class AskIndex extends Component {

    componentWillMount() {

        this.state = {
            showWantAsk: true,
            showMenu: false,
            showAnswerInput: false,
            newMsg: false,
            showMask: false,
            showBottomBtn: false,
        };

        this.askIndexObj = new AskIndexObj(this);
        this.askIndexObj.init();

    }

    componentWillUnmount() {
        this.askIndexObj._clearQueryMsg();
    }


    render() {

        return (
            <Navigator ref='nav'
                       initialRouteStack={this.askIndexObj.getInitialRouteStack()}
                       renderScene={(...args) => this.askIndexObj.renderPage(...args)}
                       configureScene={(route) => {
                           return BBTNavigator.FloatFromRight;
                       }}
                />
        );

    }


    _tplHome(nav) {
        return (
            <View style={{backgroundColor: '#efeff4', flex: 1, }}>
                <Header title='孕育问答' nav={this.props.nav} _show={this.state.showWantAsk}/>
                <HeaderRight askIndexObj={this.askIndexObj} nav={nav}/>
                <AskTab onScrollDownDragEnd={this.askIndexObj.hideWantAsk.bind(this.askIndexObj)}
                        onScrollUpDragEnd={this.askIndexObj.showWantAsk.bind(this.askIndexObj)}
                        onChangeTab={this.askIndexObj.showWantAsk.bind(this.askIndexObj)}
                        nav={nav} />
                <WantAskBtn show={this.state.showWantAsk}
                            nav={nav} />

                <Menu show={this.state.showMenu}
                      askIndexObj={this.askIndexObj}
                      nav={nav}
                    />
                <AnswerQuestion
                    show={this.state.showAnswerInput}
                    askIndexObj={this.askIndexObj}
                    />
                <Mask show={this.state.showMask}
                      style={{backgroundColor: '#fff'}}
                      onPress={() => this.askIndexObj.showOrHideBottomBtn()}/>

                <BottomMenu show={this.state.showWantAsk} nav={nav}
                            showBottomBtn={this.state.showBottomBtn}
                            askIndexObj={this.askIndexObj}/>
            </View>
        );
    }
}


class BottomMenuBtn extends Component {
    render() {

        if (this.props.show !== true) {
            return null;
        }


        return (

            <TouchableOpacity>
                <View style={{
                    backgroundColor: 'rgba(0,0,0,.55)',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    marginBottom: 10,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 14,
                    }}>
                        ha
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}


class BottomMenu extends Component {


    render() {

        return null;

        return (

            <Animated.View style={{position: 'absolute', right: 10, bottom: this.state.offset, }}>

                <BottomMenuBtn show={this.props.showBottomBtn}/>
                <BottomMenuBtn show={this.props.showBottomBtn}/>
                <BottomMenuBtn show={this.props.showBottomBtn}/>
                <BottomMenuBtn show={this.props.showBottomBtn}/>

                <TouchableOpacity onPress={() => this.props.askIndexObj.showOrHideBottomBtn()}>
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,.55)',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14,
                        }}>
                            ┇
                        </Text>
                    </View>
                </TouchableOpacity>

            </Animated.View>
        );
    }

    componentWillMount() {
        this.state = {
            offset: new Animated.Value(10),
        };

        this._animating = false;
    }

    componentWillReceiveProps(props2) {

        if (this.props.show === props2.show) {
            return;
        }

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
}


class HeaderRight extends Component {
    render() {

        let top = 29;
        if (Platform.OS === 'android') {
            top = top - 16;
        }

        return (
            <View style={{
                position: 'absolute',
                top,
                right: 7,
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 3,
                paddingRight: 3,
            }}>

                <TouchableOpacity
                    onPress={() => {
                        BBUserDataRNM.isLogin().then((res) => {
                            if (res.data === false) { // 未登录
                                return BBPageRouterRNM.showLoginPage();
                            }
                        }).then(() => {// todo 发清除新消息的请求
                            this.props.askIndexObj.setState({newMsg: false});
                            this.props.nav.push({
                                page: <AskMyMsg nav={this.props.nav} />,
                            });
                        });
                    }}
                    style={{
                        marginRight: 18,
                    }}
                    >

                    <Image source={require('./img/msg.png')}
                        style={{
                            height: 18,
                            width: 30,
                            resizeMode: 'stretch'
                        }}
                        />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.props.askIndexObj.showMenu.bind(this.props.askIndexObj)}
                    style={{
                        height: 20,
                        justifyContent: 'center',
                    }}
                    >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: '700',
                            backgroundColor: 'transparent'
                        }}
                        >
                        ○○○
                    </Text>
                </TouchableOpacity>

                {
                    this.props.askIndexObj.getState().newMsg ?
                        <View style={{width: 8, height: 8, backgroundColor: 'red', borderRadius: 10,
                position: 'absolute', left: 26, top: 0, }} />
                        :
                        null
                }


            </View>
        );
    }
}

class Menu extends Component {
    render() {

        const width = Dimensions.get('window').width;

        return (
            <Modal show={this.props.show}
                   onPressMask={() => this.props.askIndexObj.hideMenu()}
                >

                <View
                    style={{
                        backgroundColor: 'transparent',
                        width,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 10,
                        justifyContent: 'space-between',
                    }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.askIndexObj.hideMenu();
                            BBUserDataRNM.isLogin().then((res) => {
                                if (res.data === false) { // 未登录
                                    return BBPageRouterRNM.showLoginPage();
                                }
                            }).then(() => {
                                this.props.nav.push({
                                    page: <MyAsk nav={this.props.nav} />,
                                });
                            });
                        }}
                        >
                        <View
                            style={{
                                width: width - 20,
                                padding: 15,
                                backgroundColor: '#fff',
                                borderTopLeftRadius: 2,
                                borderTopRightRadius: 2,
                            }}
                            >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    color: '#007aff',
                                }}
                                >
                                我的问答
                            </Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            this.props.askIndexObj.hideMenu();
                            this.props.nav.push({
                                page: <AskTop nav={this.props.nav} />,
                            });
                        }}
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: '#d8d8dc',

                        }}
                        >
                        <View
                            style={{
                                width: width - 20,
                                padding: 15,
                                backgroundColor: '#fff',
                                borderBottomLeftRadius: 2,
                                borderBottomRightRadius: 2,
                            }}
                            >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    color: '#007aff',
                                }}
                                >
                                排行榜
                            </Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.askIndexObj.hideMenu();
                        }}
                        style={{
                            marginTop: 10,
                        }}
                        >
                        <View
                            style={{
                                width: width - 20,
                                padding: 15,
                                backgroundColor: '#fff',
                                borderRadius: 2,
                            }}
                            >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    color: '#007aff',
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

class AnswerQuestion extends Component {
    render() {
        return (
            this.props.show ?
            <TextInput
                show={this.props.show}
                style={{
                    height: 40,
                    borderTopWidth: 1,
                    borderTopColor: '#F30',
                    backgroundColor: '#eee',
                    flex: 0,
                    paddingLeft: 5
                }}
            />
            : null
        );
    }
}

module.exports = AskIndex;
AppRegistry.registerComponent('Ask', () => AskIndex);
