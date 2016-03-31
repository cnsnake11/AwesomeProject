
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
    bbtFetch,
    BBUserDataRNM,
    BBPageRouterRNM,
    FetchErrorApi,
    Toast,
} from '../../comm';

class WantAskObj extends BaseLogicObj {

    constructor(root) {
        super(root);
        this.root = root;
    }

    validate() {
        let title = this.getState().content;
        return title && title.trim();
    }


    submit() {
        let url = `api/mobile_ask/create_answer?app_id=pregnancy&client_type=${Platform.OS}&login_string=`;
        BBUserDataRNM.getUserInfo().then((res) => {
            url = url + res.data.loginString;
            let id = this.getProps().data.id || this.getProps().askDetailObj.root.props.data.id;
            this.setState({showLoading: true});
            return bbtFetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'id=' + id + '&content=' + encodeURIComponent(this.getState().content)
            });
        }).then((res) => {
            return res.json();
        }).then((res) => {

            if (res.status === 'failed') {
                this.setState({showLoading: false});
                Toast.show(res.data.message, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.TOP,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });

                if (this.getProps().type === 'like') {
                    // 从首页"立刻回答"进入.
                    this.getProps().data.hasAnswered = '1';
                    this.getProps().askListObj.refresh(this.getProps().data);
                }

                return;
            }


            if (this.getProps().type === 'like') {
                // 从首页"立刻回答"进入.
                this.getProps().nav.pop();
                this.getProps().data.hasAnswered = '1';
                this.getProps().askListObj.refresh(this.getProps().data);
            } else {
                // 详情页进入
                this.getProps().nav.pop();
                let AskDetail = this.getProps().need;
                let data = this.getProps().askDetailObj.root.props.data;
                data.hasAnswered = '1';
                if (this.getProps().askListObj) {
                    this.getProps().askListObj.refresh(data);
                }
                this.getProps().nav.replace({
                    page: <AskDetail data={data} nav={this.getProps().nav} />
                });
            }

        }).catch(() => {
            FetchErrorApi.showMsg();
            this.setState({showLoading: false});
        });
    }

}

module.exports = WantAskObj;
