
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
class AskAgainObj extends BaseLogicObj {

    constructor(root) {
        super(root);
    }

    validate() {

        let title = this.getState().title;

        if (title && title.trim()) {
            return true;
        }

        return false;

    }


    submit() {
        /*console.log(this.getProps().askDetailObj.root.props.data.id, this.getProps().data.id);
        return;*/
        let url = `api/mobile_ask/create_answer_reply?app_id=pregnancy&client_type=${Platform.OS}&login_string=`;
        let detailData = this.getProps().data;

        let qd = this.getProps().qd;
        let nickname = qd.user.nickname;
        nickname === '匿名提问' ? nickname = '匿名用户' : null;


        let photo = this.getState().photo;
        let content_images;
        if (photo) {
            let info = photo.thumb_info.middle;
            content_images = [{
                small_src: info.photo_url,
                small_width: info.width,
                small_height: info.height,
            }];
        }

        BBUserDataRNM.getUserInfo().then((res) => {
            url = url + res.data.loginString;
            console.log(res.data);
            this.setState({
                showLoading: true,
                userData: res.data,
            });
            let body = `content=${this.getState().title}&answerId=${this.getProps().data.id}&parentId=${detailData.id}`;
            if (this.getState().photo) {
                body = body + '&photo_ids=' + this.getState().photo.photo_id;
            }
            return bbtFetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
            });
        }).then((res) => {
            return res.json();
        }).then((res) => {
            let props = this.getProps();
            props.nav.pop();
            let data = props.data;
            data.reply.push({
                nickname: nickname,
                content: this.getState().title,
                content_images,
            });
            props.askDetailObj.getRefs().list.refresh(data);
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

module.exports = AskAgainObj;
