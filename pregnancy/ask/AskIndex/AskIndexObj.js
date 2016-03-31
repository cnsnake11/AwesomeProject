
'use strict';

import React, {
    Component,
    View,
    InteractionManager,
    Text,
    Image,
    Dimensions,
    ScrollView,
    BackAndroid,
    Platform,
} from 'react-native';

import {
    BaseLogicObj,
    Loading,
    BBPageRouterRNM,
    BBUserDataRNM,
    bbtFetch,
} from '../../comm';

import AskDetail from '../AskDetail/AskDetail';
import WantAsk from '../WantAsk/WantAsk';


class AskIndexObj extends BaseLogicObj {

    constructor(root) {
        super(root);
    }


    init() {

        this._queryMsg();
        this._startQueryMsg();

        BackAndroid.addEventListener('hardwareBackPress', () => {

            if (this.getRefs().nav) {

                let routes = this.getRefs().nav.getCurrentRoutes();

                if (routes.length === 1) {// 在home页了
                    if (this.getProps().nav) {// 在demo中
                        this.getProps().nav.pop();
                    } else {// 集成了app中
                        BBPageRouterRNM.popModule();
                    }
                } else {

                    if (routes[routes.length - 1].backIsClose === true) {
                        BBPageRouterRNM.popModule();
                    } else {
                        this.getRefs().nav.pop();
                    }

                }
            }
            return true;
        });
    }


    _startQueryMsg() {
        this._queryMsgTimer = setInterval(() => {
            this._queryMsg();
        }, 1000 * 60 * 10);
    }

    _clearQueryMsg() {
        if (this._queryMsgTimer) {
            clearInterval(this._queryMsgTimer);
        }
    }

    _queryMsg() {

        BBUserDataRNM.getUserInfo().then((res) => {
            if (res && res.data) {
                return bbtFetch(`api/mobile_ask/get_message_list?app_id=pregnancy&changeStatus=0&client_type=${Platform.OS}&limit=1&login_string=${res.data.loginString}&page=1`);
            }
        }).then((res) => {
            if (res) {
                return res.json();
            }
        }).then((res) => {
            if (res && res.data && res.data.newMessageCount) {
                let newMessageCount = res.data.newMessageCount / 1;
                if (newMessageCount > 0) {
                    this.setState({newMsg: true});
                } else {
                    this.setState({newMsg: false});
                }
            }
        }).catch((e) => {
            console.log('error in queryMsg' + e);
        });


    }

    showWantAsk(e) {

        if (this.getState().showWantAsk === false) {
            this.setState({showWantAsk: true});
        }

    }

    hideWantAsk(e) {

        if (e && e.nativeEvent) {
            let offset = e.nativeEvent.contentOffset.y;

            // 此值是listvewbindurl里的top按钮显示的默认高度
            if (offset < Dimensions.get('window').height / 2) {
                return;
            }
        }

        if (this.getState().showWantAsk === true) {
            this.setState({showWantAsk: false});
        }
    }

    showMenu() {
        this.setState({
            showMenu: true,
        });
    }

    hideMenu() {
        this.setState({
            showMenu: false,
        });
    }

    hideAskInput() {
        this.setState({
            showAnswerInput: false
        });
    }
    showAskInput() {
        this.setState({
            showAnswerInput: true
        });
    }

    showOrHideBottomBtn() {
        let flag = !this.getState().showBottomBtn;
        this.setState({showBottomBtn: flag });
        this.setState({showMask: flag });
    }


    renderPage(route, nav) {


        let name = route.name;
        if (!name) {
            if (route.page) {
                name = route.page.type.name;
            }
        }
        console.log(`in render page ${name}`);

        if (route.name === 'home') {
            return this.root._tplHome(nav);
        }

        if (!route.page) {
            console.error('页面导航请求没有传入page参数.');
            return null;
        }


        if (!route.page.props.nav) {
            route.page.props.nav = nav;
        }

        return (
            route.page
        );

    }

    getInitialRouteStack() {

        let props = this.getProps();

        let detailId = props.detailId;
        if (detailId) {
            return [{name: 'home', },
            {
                page: <AskDetail data={{id: detailId, }}/>,
                backIsClose: true,
            }];
        }


        let wantAsk = props.wantAsk;
        if (wantAsk === true || wantAsk === 'true') {
            return [{name: 'home', },
            {
                page: <WantAsk backIsClose={true}/>,
                backIsClose: true,
            }];
        }


        return [{name: 'home', }];

    }
}

module.exports = AskIndexObj;
