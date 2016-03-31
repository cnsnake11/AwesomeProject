
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ScrollView,
    Image,
    Dimensions,
    InteractionManager,
} from 'react-native';

import {
    BaseLogicObj,
} from '../../../bbt-react-native';

import Demo2Detail from '../Demo2Detail/Demo2Detail';


class Demo2CardObj extends BaseLogicObj {

    constructor(root) {

        super(root);

    }


    toDetail() {
        let nav = this.getProps().nav;
        nav.push({
            page: <Demo2Detail nav={nav}/>,
            name: 'Demo2Detail',
        });
    }


}


module.exports = Demo2CardObj;
