
'use strict';

import React, {
    NativeModules,
} from 'react-native';


import BbtReactNative from '../../bbt-react-native';

/**
 * 统一的对外发布出口
 * 业务使用只require这一个类即可
 */
let Comm = {


    // ******** views ********
    ListViewBindUrl: require('./views/BizListViewBindUrl'),


    // ******** api ********

    // 提供对url包装的fetch,请传入相对目录，会根据当前环境自动添加服务器地址
    // 建议所有网络请求统一使用此接口，方便监控等功能的实现
    bbtFetch: require('./api/BizBbtFetch'),


    // ******** BizRNM:业务 react native modules ********

    // 导航器组件
    BBPageRouterRNM: React.NativeModules.BBPageRouterRNM,

    // 用户数据接口，可以判断是否登录等
    BBUserDataRNM: React.NativeModules.BBUserDataRNM,

    // 公共方法，辅助开发
    BBToolRNM: React.NativeModules.BBToolRNM,

};


let exp = {};

Object.assign(exp, BbtReactNative, Comm);

module.exports = exp;
