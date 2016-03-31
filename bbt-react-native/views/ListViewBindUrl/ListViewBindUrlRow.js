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
    Image,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ViewPagerAndroid,
    Animated,
    Dimensions,
    Easing,
} from 'react-native';


class Row extends Component {

    componentWillMount() {
        this.win = Dimensions.get('window');
        this.state = {
            offset: new Animated.Value(this.win.width),
        };
    }

    render() {

        let rowNum = this.props.rowNum / 1;

        if (this.fired !== true) {
            this.fired = true;
            Animated.timing(
                this.state.offset,
                {toValue: 0, duration: 300, delay: 600 + ((rowNum + 1) * 80)}
            ).start();
        }

        return (
            <Animated.View style={{
                position: 'relative',
                left: this.state.offset,
            }}>
                {this.props.children}
            </Animated.View>
        );


    }
}

module.exports = Row;
