'use strict';

import React, {
    ActivityIndicatorIOS,
    Platform,
    ProgressBarAndroid,
    StyleSheet,
    View,
} from 'react-native';


class LoadingIndicator extends React.Component {


    static propTypes = {
        /**
         * 设置指示器的颜色
         */
        color: React.PropTypes.string,
    };

    render() {

        let color = this.props.color;

        if (Platform.OS === 'android') {
            return (
                    <ProgressBarAndroid styleAttr='Normal' color={color} />
            );
        }

        return (
                <ActivityIndicatorIOS size='large' color={color}/>
        );
    }
}

module.exports = LoadingIndicator;


