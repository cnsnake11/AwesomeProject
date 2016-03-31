
'use strict';

let React = require('react-native');
let LoadingIndicator = require('./LoadingIndicator');

let {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Platform,
    ProgressViewIOS,
    ProgressBarAndroid,
    PropTypes,
    } = React;


/**
 * 无蒙板效果，只是统一加载loading的一个封装，方便整个项目统一更换loading样式
 */


let css = StyleSheet.create({

    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {

        // fontSize:16,
        color: 'black',
    },

});


let Loading = React.createClass({

    propTypes: {

        /**
         *是否显示，默认为false
         */
        show: PropTypes.bool,

        /**
         * 指示器的颜色，默认#666
         */
        color: PropTypes.string,

        /**
         *可以为其设置style，此style会设置在loading的根view上
         */
        style: PropTypes.any, // 这没找到好的类型

        /**
         * 紧挨着指示器的view的style
         */
        wrapperStyle: PropTypes.any, // 这没找到好的类型

        /**
         * 设置主题，默认为null
         */
        theme: React.PropTypes.oneOf(['gray']),
    },


    getDefaultProps() {
        return {
            show: false,
            color: '#666',
        };
    },


    render() {

        if (this.props.show === true) {

            let themeCss;
            let color = this.props.color;
            if (this.props.theme === 'gray') {

                let padding = Platform.OS === 'android' ? 0 : 10;
                themeCss = {backgroundColor: '#666', borderRadius: 5, padding, opacity: 0.9, };
                color = '#fff';
            }

            return (
                <View style={[css.wrapper, this.props.style]} >
                    <View style={[themeCss, this.props.wrapperStyle]} >
                        <LoadingIndicator color={color}/>
                    </View>
                </View>
            );
        }

        return null;

    },

});



module.exports = Loading;

