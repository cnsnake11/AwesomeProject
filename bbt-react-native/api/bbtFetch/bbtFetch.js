
'use strict';

import React,
{NetInfo, } from 'react-native';

let BbtFetch = {

    fetch(url, cfg) {

        console.log(`发送请求。url = ${url}, cfg = ${cfg ? JSON.stringify(cfg) : cfg}`);

        return NetInfo.fetch().then((reach) => {


            // 自行判断的原因是：android在断网发第一个post请求的时候会崩溃
            if (reach === 'none' || reach === 'NONE') {
                throw new Error('network is none ! ');
            }

            return fetch(url, cfg);

        }).then((res) => {
            console.log(res);
            return res;
        }).catch((error) => {
            console.log(error);
            throw error;
        });

    }

};


module.exports = BbtFetch.fetch;
