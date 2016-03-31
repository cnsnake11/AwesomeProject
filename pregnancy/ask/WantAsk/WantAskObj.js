
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
    ImagePreview,
    dismissKeyboard,
} from '../../comm';

import AskDetail from '../AskDetail/AskDetail';

class WantAskObj extends BaseLogicObj {

    constructor(root) {
        super(root);
    }

    validate() {

        let title = this.getState().title;

        if (title && title.trim() && title.length <= this.root.maxLength) {
            return true;
        }

        return false;

    }


    submit() {

        let url = `/api/mobile_ask/create?app_id=pregnancy&client_type=${Platform.OS}&login_string=`;

        let nickname;
        let avatar;

        BBUserDataRNM.getUserInfo().then((res) => {
            url = url + res.data.loginString;
            nickname = this.getState().anony === true ? '匿名用户' : res.data.userName;
            avatar = res.data.userAvatar;

            this.setState({showLoading: true});

            let body = `title=${this.getState().title}&anony=${this.getState().anony === true ? 1 : 0}`;
            if (this.getState().photo) {
                body = body + '&photo_ids=' + this.getState().photo.photo_id;
            }

            return bbtFetch(url, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
            });
        }).then((res) => {
            return res.json();
        }).then((res) => {

            let nav = this.getProps().nav;

            this.getProps().nav.replace({
                page: <AskDetail nav={nav}
                                 data={{id: res.data.id, title: this.getState().title,
                                 nickname, avatar }} />
            });
        }).catch(() => {
            FetchErrorApi.showMsg();
            this.setState({showLoading: false});
        });


    }

    photoOrPreview() {
        if (this.getState().photo) {
            this.preview();
        } else {
            this.photo();
        }
    }

    photo() {
        BBPageRouterRNM.choosePhoto({
            sessionId: 'ask',
            number: "1",
        }).then((res) => {

            if (!(res && res.data && res.data.photoJsonStr)) {
                return;
            }

            let photoArray = JSON.parse(res.data.photoJsonStr);

            if (photoArray.length !== 1) {
                return;
            }

            this.setState({photo: photoArray[0]});

        });
    }

    preview() {
        dismissKeyboard();
        this.getProps().nav.push({
            page: this._getPreivewPage(),
        });
    }

    _getPreivewPage() {

        let info = this.getState().photo.thumb_info.big;
        let {photo_url, width, height} = info;

        let winW = Dimensions.get('window').width;
        let winH = Dimensions.get('window').height;

        width > winW ? width = winW : null;
        height > winH ? height = winH : null;

        return (
            <ImagePreview nav={this.getProps().nav}
                          onDelBtnPress={() => this._onDelBtnPress()}
                          image={<Image source={{uri: photo_url}}
                          style={{width: width / 1, height: height / 1, resizeMode: 'contain'}}/>} />
        );
    }

    _onDelBtnPress() {
        this.setState({photo: null});
        this.getProps().nav.pop();
    }

}

module.exports = WantAskObj;
