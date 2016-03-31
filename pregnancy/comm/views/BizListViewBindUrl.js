'use strict';

import React from 'react-native';

import {
    ListViewBindUrl,
    bbtFetch,
} from '../../../bbt-react-native';

import bizBbtFetch from '../api/BizBbtFetch';


class BizListViewBindUrl extends ListViewBindUrl {

    constructor() {
        super();
    }


    _fetchImp(url, cfg) {

        if (this._startWith(url, "http://") || this._startWith(url, "https://")) {
            return bbtFetch(url, cfg);
        }

        return bizBbtFetch(url, cfg);

    }


    _startWith(s1, str) {
        if (str === null || str === "" || s1.length === 0 || str.length > s1.length) {
            return false;
        }

        if (s1.substr(0, str.length) === str) {
            return true;
        }

        return false;
    }

}


module.exports = BizListViewBindUrl;
