
'use strict';

let React = require('react-native');
let {
    StyleSheet,
    Dimensions,
    } = React;

let css = StyleSheet.create(
    {
        footerLoadingView: {
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',

            width: Dimensions.get('window').width,
            flex: 0, // 一行多列要加这个，否则宽度不生效，因为loading组件的flex默认为1
        },
    }
);

module.exports = css;
