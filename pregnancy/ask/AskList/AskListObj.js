
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
} from 'react-native';

import {
    BaseLogicObj,
    Loading,
    DateApi,
    BBPageRouterRNM,
    BBUserDataRNM,
} from '../../comm';

import AskDetail from '../AskDetail/AskDetail';


class AskListObj extends BaseLogicObj {

    constructor(root) {
        super(root);
        this.lastId = 0;

        this.userData = {};

    }


    _initUserData() {
        return BBUserDataRNM.getUserInfo().then((res) => {
            this.userData = res.data;
            return res;
        });
    }

    getUrl(curPage) {

        return BBUserDataRNM.getUserInfo().then((res) => {

            this.userData = res.data;

        }).then(() => {

            let act = this.getProps().act;

            let id = this.lastId;

            if (curPage === 0) {// 兼容下拉刷新的情况
                id = 0;
            }

            let loginString = this.userData.loginString;
            let babyBirthday = (this.userData.babyBirthDay / 1) * 1000;
            babyBirthday = DateApi.format(babyBirthday,"yyyy-MM-dd");

            let url = `/api/mobile_ask_intf/get_question?act=${act}&app_id=pregnancy&babyBirthday=${babyBirthday}&client_type=${Platform.OS}&createTs=0&id=${id}&limit=10&login_string=${loginString}&page=${curPage + 1}`;

            return url;
        });

    }

    getData(res, curPage) {

        let act = this.getProps().act;

        if (act === 'birth') {
            let tmp = res.data.birth.list || [];

            let length = tmp.length;
            if (length > 0) {
                this.lastId = tmp[length - 1].id;
            }

            if (curPage !== 0) {// 不是第一页
                return tmp;
            }

            let tmp2 = [];
            if (res.data.think) {// 帮助了几位麻麻
                tmp2.push(res.data.think);
            }
            tmp2 = tmp2.concat(res.data.active.list);// 活动
            tmp2 = tmp2.concat(tmp);

            return tmp2;
        } else if (act === 'new') {
            let tmp = res.data.list;
            let length = tmp.length;
            if (length > 0) {
                this.lastId = tmp[length - 1].id;
            }
            return tmp;
        } else if (act === 'well') {
            let tmp = res.data.list;
            let length = tmp.length;
            if (length > 0) {
                this.lastId = tmp[length - 1].id;
            }
            return tmp;
        }

        console.error('无法处理act = ' + act);

    }

    getTime(msStr) {
        return DateApi.getTimeFromGive(msStr);
    }

    goToDetail(data, obj) {

        // console.log('go to detail obj: -------', obj);
        // console.log('go to detail data: -------', data);
        this.getProps().nav.push({
            page: <AskDetail data={data}
                             askListObj={obj.askListObj}
                             nav={this.getProps().nav} />,
        });
    }

    openHd(url) {// todo
        BBPageRouterRNM.showPage({url});
    }


    showBtn(rowData) {

        if (rowData.encUserId === this.userData.uid) {
            return false;
        }

        return this.getProps().showBtn;
    }

    refresh(rowData) {
        this.getRefs().list.refresh(rowData);
    }
}

module.exports = AskListObj;
