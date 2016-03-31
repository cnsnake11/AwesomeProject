/**
 * Created by wumingli on 16/2/16.
 */

'use strict';

import React, {
    Component,
    View,
    InteractionManager,
    Text,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

import {
    BaseLogicObj,
    Loading,
    DateApi,
    bbtFetch,
    BBUserDataRNM,
} from '../../comm';

import AskDetail from '../AskDetail/AskDetail';
class CommonListObj extends BaseLogicObj {

    constructor(root) {
        super(root);
        this.lastId = 0;
        this.page = 0;
    }

    getUrl(curPage) {
        if (this.url === undefined) {
            console.error('list url is undefined, please check...');
            return;
        }
        return BBUserDataRNM.getUserInfo().then((res) => {
            this.userData = res.data;
        }).then(() => {
            let loginString = this.userData.loginString;
            let url = this.url;
            url = url + '&app_id=pregnancy&babyBirthday=&client_type=ios&createTs=0&page=' + (curPage + 1) + '&login_string=' + loginString;
            return url;
        });
    }

    getData(res) {
        let tmp = res.data.list;
        if (tmp.length > 0) {
            return tmp;
        }
    }

    getTime(msStr) {
        return DateApi.getTimeFromGive(msStr);
    }

    goToDetail(data) {
        this.getProps().nav.push({
            page: <AskDetail data={data}
                             nav={this.getProps().nav} />,
        });
    }
}

module.exports = CommonListObj;
