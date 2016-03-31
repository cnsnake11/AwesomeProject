

'use strict';

import React, {
    NativeModules,
    DeviceEventEmitter,
    Platform,
} from 'react-native';

/**
 * 统一的对外发布出口
 * 业务使用只require这一个类即可
 */
let BbtReactNative = {

    // base
    baseCss: require('./base/BaseCss/Base.css'),
    BaseLogicObj: require('./base/BaseLogicObj/BaseLogicObj'),
    BBTNavigator: require('./base/BaseLogicObj/BBTScene'),

    // views
    Loading: require('./views/Loading/Loading'),
    ListViewBindUrl: require('./views/ListViewBindUrl/ListViewBindUrl'),
    Mask: require('./views/Mask/Mask'),
    Modal: require('./views/Modal/Modal'),
    FetchError: require('./views/FetchError/FetchError'),
    Checkbox: require('./views/Checkbox/Checkbox'),
    KeyboardSpacer: require('./views/KeyboardSpacer/KeyboardSpacer'),
    AnimatedView: require('./views/AnimatedView/AnimatedView'),
    ImagePreview: require('./views/ImagePreview/ImagePreview'),
    Navigator: require('./views/Navigator/Navigator'),

    // apis
    TabApi: require('./api/TabApi/TabApi'),
    DateApi: require('./api/DateApi/DateApi'),
    FetchErrorApi: require('./api/FetchErrorApi/FetchErrorApi'),
    Util: require('./api/Util/Util'),
    Toast: require('./api/Toast/Toast'),
    dismissKeyboard: require('react-native/Libraries/Utilities/dismissKeyboard'),

    // 仅仅对fetch进行了一层封装，建议所有网络请求统一使用此接口，方便监控等功能的实现
    bbtFetch: require('./api/bbtFetch/bbtFetch'),


    // RNM:react native modules
    SelectImageRNM: NativeModules.SelectImageRNM,

    // CookieRNM: NativeModules.CookieRNM,
    // NavigatorRNM: NativeModules.NavigatorRNM,


    // lib
    LibTabBar: require('./lib/react-native-scrollable-tab-view/DefaultTabBar'),
};


// 注册全局的键盘隐藏事件，解决android下通过软键盘或者后退按钮隐藏软键盘时候，textinput的focus不对的问题
if (Platform.OS === 'android') {
    let TextInputState = require('TextInputState');
    DeviceEventEmitter.addListener("keyboardDidHide", () => {
        TextInputState._currentlyFocusedID = null;
    });
}

module.exports = BbtReactNative;
