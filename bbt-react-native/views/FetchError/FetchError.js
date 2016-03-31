
'use strict';


let React = require('react-native');

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

let Modal = require('../Modal/Modal');
let Util = require('../../api/Util/Util');

let FetchError = React.createClass({

    propTypes: {

        /**
         *导航器对象
         */
        nav: React.PropTypes.any,

        /**
         * 场景对象，即nav.push(route)中的route，可以为空，为空就会从nav中获取最上面的route
         */
        route: React.PropTypes.any,

        /**
         * 点击重试的时候回触发此事件，可以为空，为空会nav.replace(route)即刷新当前页面
         */
        onRetry: React.PropTypes.func,
    },


    render() {

        let nav = this.props.nav;
        let route = this.props.route;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f8f3'}}>

                <Image style={{width: 220, height: 170, }}
                    source={require('./img/fetch_error.png')} />

                <Text style={{color: '#78797b'}}>暂时木有网络，刷新看看？</Text>

                <TouchableOpacity
                    style={{padding: 10, paddingLeft: 30, paddingRight: 30, marginTop: 20,
                    backgroundColor: '#84dcdb', borderRadius: 5, }}
                    onPress={() => {
                        if (this.props.onRetry) {
                            this.props.onRetry();
                        } else {
                            Util.refresh(nav, route);
                        }
                    }}>
                    <Text style={{color: '#fff'}}>刷新</Text>
                </TouchableOpacity>
            </View>
        );
    },

});

module.exports = FetchError;












