

'use strict';

/**
 * 统一的对外发布出口
 * 业务使用只require这一个类即可
 */
let BbtReactNative={

    //base
    baseCss:require('./base/BaseCss/Base.css'),
    BaseLogicObj:require('./base/BaseLogicObj/BaseLogicObj'),


    //views
    Loading:require('./views/Loading/Loading'),
    ListViewBindUrl:require('./views/ListViewBindUrl/ListViewBindUrl'),
    Mask:require('./views/Mask/Mask'),
    Modal:require('./views/Modal/Modal'),

    //apis
    TabApi:require('./api/TabApi/TabApi'),

    //RNM:react native modules
    selectImageRNM:require('react-native').NativeModules.SelectImageRNM,

};


module.exports=BbtReactNative;