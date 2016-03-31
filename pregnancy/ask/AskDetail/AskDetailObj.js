
'use strict';

import React, {
    Component,
    View,
    InteractionManager,
    Text,
    Image,
    Dimensions,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';

import {
    BaseLogicObj,
    Loading,
    bbtFetch,
    BBUserDataRNM,
    BBPageRouterRNM,
    FetchErrorApi,
} from '../../comm';

import Header from '../Header/Header';

class AskDetailObj extends BaseLogicObj {

    constructor(root) {
        super(root);
    }

    initQuery() {

        let url = 'api/mobile_ask/get_info?id=' + this.getProps().data.id + '&login_string=';


        BBUserDataRNM.getUserInfo().then((res) => {
            this.setState({
                userData: res.data,
            });
            return bbtFetch(url + res.data.loginString);
        }).
            then((res) => res.json()).
            then((res) => {

                this.queryData = res.data;

                this.listInitData = [].concat(res.data.answers.best, res.data.answers.normal);

                this.setState({
                    initQuerying: false,
                });
            }).catch((error) => {

                let {nav, } = this.getProps();
                FetchErrorApi.showPage({
                    nav,
                    header: <Header nav={nav} title='问答详情' />,
                });
            });

        this._initAd();
    }

    _initAd() {
        let url = `api/ad/show?app_id=pregnancy&client_type=${Platform.OS}&is_prepare=0&lquestion_id=${this.getProps().data.id}&zone_type=ask_detail`;

        bbtFetch(url).
            then((res) => res.json()).
            then((res) => {

                // console.log(res);
                let adData = res.data.ad;
                this.setState({
                    adData,
                });
            }).catch(() => {});

    }

    getUrl(curPage) {
        let url = 'api/mobile_ask/get_answer_list?id=' + this.getProps().data.id + '&page=' + (curPage + 1);
        return url;
    }

    getData(res) {
        return res.data.list;
    }


    openAd() {

        let url = this.getState().adData.ad_url;
        BBPageRouterRNM.showPage({url});

    }

    showShare() {
        let data = this.queryData || this.getProps().data;
        let content = '';
        if (this.listInitData && this.listInitData.length > 0) {
            content = this.listInitData[0].content;
        }

        BBUserDataRNM.isLogin().then((res) => {

            if (res.data === false) {// 未登录
                return BBPageRouterRNM.showLoginPage();
            }

            // 已经登录
            return 'login';


        }).then((res) => {
            if (res === 'login') {
                return res;
            }
            return BBUserDataRNM.getUserInfo();
        }).then((res) => {
            if (res === 'login') {
                return res;
            }
            this.setState({
                userData: res.data,
            });
        }).then(() => {
            let shareInfo = {
                title: data.title,
                content,
                shareUrl: `http://m.babytree.com/ask/detail/${this.getProps().data.id}`,
                imageUrl: 'http://pic01.babytreeimg.com/foto3/common_photo/original/2014/1112/f9552b8077308021.png',
            };
            BBPageRouterRNM.shareOpen(shareInfo);
        });
    }

    processHtml(str) {
        if (!str) {
            return str;
        }

        let res = str.replace(/<br \/>/g, '\n');
        /*
        res = res.replace(/<p>/g, '');
        res = res.replace(/<\/p>/g, '');
        */
        res = res.replace(/&nbsp;/g, ' ');
        res = this._removeHtml(res);
        return res;
    }


    _removeHtml(str) {
        return str.replace(/<[^>]+>/g, "");
    }

    setAnswerRate(data) {
        return (
            () => {
                let url = `api/mobile_ask/set_answer_rate?app_id=pregnancy&client_type=${Platform.OS}&login_string=${this.getState().userData.loginString}`;

                this.setState({showLoading: true});
                bbtFetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `answerId=${data.id}`,
                }).then((res) => {
                    data.hasRate = '1';
                    data.rateCount = data.rateCount / 1 + 1;
                    this.getRefs().list.refresh(data);
                }).catch((e) => {
                    FetchErrorApi.showMsg();
                }).done(() => this.setState({showLoading: false}));

            }
        )();
    }

    canAskAgain() {

        return false;
    }

    canRate(answerData) {// 能否设置有用

        /*if (this.isQuestionOwner() === true) {// 自己的问题不能点
            return false;
        }

        if (this.isAnswerOwner(answerData) === true) {// 自己的回答不能点
            return false;
        }

        if (answerData.hasRate === '1') {// 点过不能点
            return false;
        }

        return true;*/
        if (this.isAnswerOwner(answerData) === true) {// 自己的回答不能点
            return false;
        }
        return answerData.hasRate !== '1';
    }

    canAnswer() {// 能否回答

        let data = this.queryData;

        if (!data) {
            return false;
        }

        if (data.status === 'closed' || data.status === 'deleted') {// 关闭的问题不能点
            return false;
        }

        if (data.hasReply === '1') {// 回答过的不能点
            return false;
        }

        if (this.isQuestionOwner() === true) {// 自己的问题不能点
            return false;
        }

        return true;
    }

    canBest() {// 能否设为最佳

        let data = this.queryData;

        if (!data) {
            return false;
        }

        if (data.status === 'closed' || data.status === 'deleted') {// 关闭的问题不能点
            return false;
        }


        if (this.isQuestionOwner() !== true) {// 不是自己的问题不能点
            return false;
        }

        return true;
    }


    bestBtnPress(data, answerData) {// todo
        Alert.alert('选为最佳', '确定选为最佳答案吗?', [
            {
                text: '取消',
                onPress: () => {
                    console.log('取消选为最佳');
                }
            },
            {
                text: '确定',
                onPress: () => {
                    let url = `api/mobile_ask/set_best_answer?app_id=pregnancy&client_type=${Platform.OS}&login_string=${this.getState().userData.loginString}`;

                    this.setState({
                        showLoading: true
                    });
                    BBUserDataRNM.getUserInfo().then((res) => {
                        return bbtFetch(url, {
                            method: 'POST',
                            headers: {
                                Accept: '*/*',
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `answerId=${answerData.id}&id=${this.getProps().data.id}`,
                        });
                    }).then((res) => {
                        this.getProps().data.status = 'closed';
                        let nav = this.getProps().nav;

                        let routes = nav.getCurrentRoutes();
                        let length = routes.length;
                        let route = routes[length - 1];

                        let Tag = route.page.type;
                        nav.replace({
                            page: <Tag {...route.page.props} />,
                        });
                    }).catch((e) => {
                        FetchErrorApi.showMsg();
                    });
                }
            }
        ]);
    }

    isQuestionOwner() {

        if (this.getState().userData && this.queryData && this.queryData.user) {
            if (this.getState().userData.uid === this.queryData.user.encUserId) {
                return true;
            }
        }

        return false;
    }

    isAnswerOwner(answerData) {

        if (this.getState().userData) {
            if (this.getState().userData.uid === answerData.user.encUserId) {
                return true;
            }
        }

        return false;
    }

    // 可以追问
    canAnswerAgain(data) {
        let qd = this.queryData;
        let len = qd.answers.normal.length;
        if (!this.isQuestionOwner()) {
            return false;
        }
        if (qd.status === 'closed' || qd.status === 'deleted') {
            return false;
        }
        if (data.can_answer === '0') {
            return false;
        }
        if (len === 0) {
            return false;
        }
        return this.getState().userData.uid !== data.user.encUserId;
    }

    refreshReply(rowData) {
        if (this.getRefs().list) {
            this.getRefs().list.refresh(rowData);
        }
    }
}

module.exports = AskDetailObj;
