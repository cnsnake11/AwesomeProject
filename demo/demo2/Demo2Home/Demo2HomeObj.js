
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

import Demo2Menu from '../Demo2Menu/Demo2Menu';


class Demo2HomeObj extends BaseLogicObj {

    constructor(root) {

        super(root);

    }


    toMenu() {
        let nav = this.getProps().nav;
        nav.push({
            page: <Demo2Menu nav={nav}/>,
            name: 'Demo2Menu',
        });
    }


    onScroll(e) {
        let offset = e.nativeEvent.contentOffset.x;
        console.log(offset);
        this.setState({offset});
    }

}


module.exports = Demo2HomeObj;
