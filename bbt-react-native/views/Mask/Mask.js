
'use strict';


let React = require('react-native');
let baseCss = require('../../base/BaseCss/Base.css');

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
    } = React;


let css = StyleSheet.create({
    mask: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0,
    },
});

let Mask = React.createClass({

    propTypes: {

        /**
         *是否显示，默认为false
         */
        show: React.PropTypes.bool,

        /**
         * 设置view的style
         */
        style: React.PropTypes.any,

        /**
         * 点击事件
         */
        onPress: React.PropTypes.func,
    },


    render() {
        return (
            this.props.show === true ?
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={[css.mask, this.props.style]}/>
                </TouchableWithoutFeedback>
                :
                null
        );
    },

});


module.exports = Mask;












