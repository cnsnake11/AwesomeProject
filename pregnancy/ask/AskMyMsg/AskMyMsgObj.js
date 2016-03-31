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
class AskMyMsgObj extends BaseLogicObj {

    constructor(root) {
        super(root);
    }

    getUrl(curPage) {
        return BBUserDataRNM.getUserInfo().then((res) => {
            this.userData = res.data;
        }).then(() => {
            let loginString = this.userData.loginString;
            const url = `api/mobile_ask/get_message_list?changeStatus=1&app_id=pregnancy&babyBirthday=&client_type=ios&createTs=0&limit=10&login_string=${loginString}&page=${curPage + 1}`;
            return url;
        });
    }

    getData(res) {
        let data = res.data.list;
        if (data.length > 0) {
            return data;
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

module.exports = AskMyMsgObj;
