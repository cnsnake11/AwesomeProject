
'use strict';

let React = require('react-native');
let{
    View,
    } = React;
let FetchError = require('../../views/FetchError/FetchError');
let Toast = require('../Toast/Toast');

class FetchErrorApi {

    /**
     * 网络错误时，会将出错页面替代当前页面
     * @param opt opt.nav opt.header opt.wrapperStyle
     */
    static showPage(opt) {
        let {nav, header, wrapperStyle, } = opt;
        if (!nav) {
            throw new Error('nav must not null!');
        }

        nav.replace({
            page: FetchErrorApi._getErrorPage(opt)
        });
    }

    /**
     * 网络错误时候弹出的toast信息
     */
    static showMsg() {
        Toast.show('网络不给力啊，请重试。', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    static _getErrorPage(opt) {
        let {nav, header, wrapperStyle, } = opt;
        let routes = nav.getCurrentRoutes();
        let length = routes.length;
        let route = routes[length - 1];

        return (
            <View style={[{flex: 1, }, wrapperStyle]}>
                {header}
                <FetchError nav={nav} route={route}/>
            </View>
        );
    }

}

module.exports = FetchErrorApi;
