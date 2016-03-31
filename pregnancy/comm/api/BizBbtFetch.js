
'use strict';

import React, {
    NativeModules,
} from 'react-native';

import {
    bbtFetch,
} from '../../../bbt-react-native';

let BizBbtFetch = {

    fetch(url, cfg) {
        let bbtToolRNM = React.NativeModules.BBToolRNM;

        if (!bbtToolRNM) {
            console.log('非孕育app环境 or 安卓环境，使用www.babytree.com。');
            let pre = 'http://www.babytree.com/';

            // pre = 'http://wumingli.babytree-dev.com/';
            let url2 = pre + url;
            return bbtFetch(url2, cfg);
        }

        return bbtToolRNM.currentHostName().
            then((res) => {
                let pre = res.data;
                let url2 = pre + '/' + url;
                return bbtFetch(url2, cfg);
            });

    }

};


module.exports = BizBbtFetch.fetch;
