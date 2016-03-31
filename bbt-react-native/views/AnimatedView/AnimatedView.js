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
} from 'react-native';


class AnimatedView extends Component {

    componentWillMount() {

        this.win = Dimensions.get('window');
        let type = this.props.type || 'fromLeft';

        if (type === 'fromUp') {

            this.state = {
                offset: new Animated.Value(this.win.height),
            };
            this.css = {bottom: this.state.offset};

        } else if (type === 'fromBottom') {

            this.state = {
                offset: new Animated.Value(this.win.height),
            };
            this.css = {top: this.state.offset};

        } else if (type === 'fromLeft') {

            this.state = {
                offset: new Animated.Value(this.win.width),
            };
            this.css = {right: this.state.offset};

        } else if (type === 'fromRight') {

            this.state = {
                offset: new Animated.Value(this.win.width),
            };
            this.css = {left: this.state.offset};

        } else {
            throw new Error('没有符合要求的方向。');
        }

    }

    render() {

        if (this.fired !== true) {
            this.fired = true;

            let index = this.props.index / 1 || 0;
            let delay = this.props.delay / 1 || 0;

            setTimeout(() => { // 用settimeout可以避开rn的交互管理器
                Animated.timing(
                    this.state.offset,
                    {toValue: 0, duration: 300}
                ).start();
            }, delay + (index * 80));
        }


        return (
            <Animated.View style={[{position: 'relative'}, this.css]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

module.exports = AnimatedView;
