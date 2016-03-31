
'use strict';

let React = require('react-native');
let baseCss = require('../../base/BaseCss/Base.css');
let Mask = require('../Mask/Mask');

let {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    PanResponder,
    LayoutAnimation,
    InteractionManager,
    PropTypes,
    } = React;


let css = StyleSheet.create({

    wrapper: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 20, // todo -20是兼容安卓高不准的问题,此问题还需要解决
        top: 0,
        left: 0,
        backgroundColor: 'transparent',

        padding: 0,
        margin: 0,
        flex: 1,
        overflow: 'visible',
        flexDirection: 'row',
    },

    modal: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },

});

let Modal = React.createClass({

    propTypes: {

        /**
         *是否显示，默认为false
         */
        show: PropTypes.bool,

        /**
         * 点击蒙板触发的事件
         */
        onPressMask: PropTypes.func
    },


    getInitialState() {
        return {
            offset: new Animated.Value(Dimensions.get('window').height + 300),
            reallyHidden: true,
        };
    },

    render() {
        return (

            <TouchableWithoutFeedback style={[css.wrapper, this.state.reallyHidden === true ? baseCss.hidden : '']}>

                <View style={[css.wrapper, this.state.reallyHidden === true ? baseCss.hidden : '']}>

                    <Mask show={true} onPress={this.props.onPressMask} />

                    <TouchableWithoutFeedback onPress={() => false}>
                        <Animated.View style={[css.modal, {transform: [{translateY: this.state.offset}]}]} >
                            {this.props.children}
                        </Animated.View>
                    </TouchableWithoutFeedback>

                </View>

            </TouchableWithoutFeedback>


        );
    },


    componentWillMount() {
        if (this.props.show === true) {
            this._show();
        }

    },


    componentWillReceiveProps(props2) {

        if (this.props.show === props2.show) {

            // console.log('props not changed. return .');
            return;
        }

        // console.log('props  changed show=' + props2.show);
        if (props2.show === false) {
            this._hide();
        } else {
            this._show();
        }

    },

    _show() {
        this.setState({reallyHidden: false});
        Animated.spring(
            this.state.offset,
            {toValue: (0), friction: 10, }
        ).start();
    },

    _hide() {
        Animated.timing(
            this.state.offset,
            {toValue: (Dimensions.get('window').height), duration: 200, }
        ).start(() => this.setState({reallyHidden: true}));
    },


});


module.exports = Modal;












