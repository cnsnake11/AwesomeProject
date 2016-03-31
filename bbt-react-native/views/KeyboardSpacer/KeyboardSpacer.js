import React from "react-native";

const {
    Platform,
    Animated,
    View,
    DeviceEventEmitter,
    Dimensions,
    } = React;

const KITKAT = 19;

class KeyboardSpacer extends React.Component {

    static propTypes = {
        /**
         * 键盘弹出时候会触发此事件，入参为event，通过event.endCoordinates.height可以获得键盘高度
         */
        onShow: React.PropTypes.func,
        /**
         * 键盘隐藏时候会触发此事件，入参为event。
         */
        onHide: React.PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };
    }

    componentWillMount() {
        this._registerEvents();
    }

    componentWillUnmount() {
        this._unRegisterEvents();
    }

    _registerEvents() {
        this._keyboardDidShowSubscription = DeviceEventEmitter.addListener("keyboardDidShow", e => this._keyboardDidShow(e));
        this._keyboardDidHideSubscription = DeviceEventEmitter.addListener("keyboardDidHide", e => this._keyboardDidHide(e));
    }

    _unRegisterEvents() {
        this._keyboardDidShowSubscription.remove();
        this._keyboardDidHideSubscription.remove();
    }

    _keyboardDidShow(e) {

        if (Platform.OS !== 'android') { // android系统本身能解决这个问题，不需要view来顶起来
            this.setState({
                height: e.endCoordinates.height,
            });
        }

        if (this.props.onShow) {
            this.props.onShow(e);
        }
    }

    _keyboardDidHide(e) {

        if (Platform.OS !== 'android') {
            this.setState({
                height: 0,
            });
        }

        if (this.props.onHide) {
            this.props.onHide(e);
        }
    }

    render() {
        return <View style={{ height: this.state.height}} />;
    }
}
// The app pans to show the Keyboard below Kitkat (We set it to resize from Kitkat to upwards)
// module.exports = Platform.OS === "android" && Platform.Version < KITKAT ? View : KeyboardSpacer;
// module.exports = Platform.OS === "android" ? View : KeyboardSpacer;
module.exports = KeyboardSpacer;
