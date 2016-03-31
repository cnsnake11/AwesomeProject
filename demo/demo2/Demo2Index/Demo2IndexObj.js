
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

import Demo2Home from '../Demo2Home/Demo2Home';


class Demo2IndexObj extends BaseLogicObj {

    constructor(root) {

        super(root);

        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                this.setState({showSplash: false});
            }, 300);
        });

    }

    onHardwareBackPress() {

        if (this.getState().showLogin === true) {
            this.hideLogin();
            return false;
        }

        if (this.getState().showSignIn === true) {
            this.hideSignIn();
            return false;
        }

        return true;
    }

    showLogin() {
        this.setState({
            showLogin: true,
        });
    }

    hideLogin() {
        this.setState({
            showLogin: false,
        });
    }

    showSignIn() {
        this.setState({
            showSignIn: true,
        });
    }

    hideSignIn() {
        this.setState({
            showSignIn: false,
        });
    }


    toHome() {
        let nav = this.getRefs().nav
        nav.push({
            page: <Demo2Home nav={nav} />,
        });
    }
}


module.exports = Demo2IndexObj;
