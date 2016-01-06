
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
} from '../../../bbt-react-native';


class DetailObj extends BaseLogicObj {


    constructor(root) {
        super(root);
        this.data = {
            img: '',
            canEatList: [],
            adImg: '',
            tips: '',
        };
        this.icon1 = require('../ResultList/img/1.png');
        this.icon2 = require('../ResultList/img/2.png');
        this.icon3 = require('../ResultList/img/3.png');
    }


    showShare() {
        this.setState({
            showShare: true,
        });
    }

    hideShare() {
        this.setState({
            showShare: false,
        });
    }

    query() {

        let htmlStr = this.getProps().htmlStr;

        if (htmlStr) {
            this._processHtmlStr(htmlStr);
            this.setState({querying: false, });
        } else {
            let id = this.getProps().id;
            let url = `http://www.babytree.com/api/mobile_toolcms/can_eat_detail?id=${id}`;

            fetch(url).
                then((res) => res.text()).
                then((res) => {
                    this._processHtmlStr(res);
                    this.setState({querying: false, });
                });
        }


    }

    _processHtmlStr(str) {

        str = str.substring(str.indexOf('img src="') + 'img src="'.length, str.length);

        this.data.img = str.substring(0, str.indexOf('"/>'));

        this._processCanEatList(str);

        this._processAd(str);

        this._processTips(str);
    }

    _processTips(str) {

        let index = str.indexOf('class="tips"');

        // 有小贴士
        if (index !== -1) {
            str = str.substring(index, str.length);
            str = str.substring(str.indexOf('<div class="text">') + '<div class="text">'.length, str.length);
            let tips = str.substring(0, str.indexOf('</div>'));
            this.data.tips = tips.trim();
        }
    }


    _processAd(str) {

        let index = str.indexOf("class='product-img'>");

        // 有推广
        if (index !== -1) {
            str = str.substring(index, str.length);
            str = str.substring(str.indexOf("<img src='") + "<img src='".length, str.length);
            let img = str.substr(0, str.indexOf("' border='0' alt='' />"));
            this.data.adImg = img;
        }
    }


    _processCanEatList(str) {

        let index = str.indexOf('"caneat-title">');

        if (index !== -1) {
            let title;
            let status;
            let des;
            let icon;

            str = str.substring(index + '"caneat-title">'.length, str.length);
            title = str.substring(0, str.indexOf('</h1>'));

            index = str.indexOf("<em>");
            str = str.substring(index + '<em>'.length, str.length);
            status = str.substring(0, str.indexOf('</em>'));

            index = str.indexOf('class="text">');
            str = str.substring(index + 'class="text">'.length, str.length);
            des = str.substring(0, str.indexOf('</div>'));


            if (status === '能吃') {
                icon = this.icon1;
            } else if (status === '少吃') {
                icon = this.icon2;
            } else if (status === '不能吃') {
                icon = this.icon3;
            }


            this.data.canEatList.push(
                {
                    title,
                    status,
                    des,
                    icon,
                }
            );

            this._processCanEatList(str);
        }


    }

}

module.exports = DetailObj;
