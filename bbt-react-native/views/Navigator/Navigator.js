import React from "react-native";

const {
    Platform,
    Animated,
    View,
    DeviceEventEmitter,
    Dimensions,
    Navigator,
    BackAndroid,
    } = React;

import BBTNavigator from '../../base/BaseLogicObj/BBTScene';

class Navigator2 extends React.Component {

    componentWillMount() {

        BackAndroid.addEventListener('hardwareBackPress', () => {

            if (this.refs.nav) {

                let routes = this.refs.nav.getCurrentRoutes();
                let lastRoute = routes[routes.length - 1];

                if (lastRoute.onHardwareBackPress) {// 先执行route注册的事件
                    let flag = lastRoute.onHardwareBackPress();
                    if (flag === false) {// 返回值为false就终止后续操作
                        return true;
                    }
                }


                if (routes.length === 1) {// 在第一页了

                    if (this.props.nav) {// 父页面仍有nav
                        this.props.nav.pop();
                    }

                    if (this.props.onHardwareBackPressInFirstPage) {
                        this.props.onHardwareBackPressInFirstPage();
                    }

                } else {

                    if (lastRoute.backIsClose === true) {
                        if (this.props.onHardwareBackPressInFirstPage) {
                            this.props.onHardwareBackPressInFirstPage();
                        }
                    } else {
                        this.refs.nav.pop();
                    }
                }
            }

            return true;
        });
    }


    getLastRoute() {
        if (this.refs.nav) {
            let routes = this.getCurrentRoutes();
            let lastRoute = routes[routes.length - 1];
            return lastRoute;
        }

        return null;
    }

    render() {
        return <Navigator renderScene={this._renderPage.bind(this)}
                          configureScene={(route) => {
                              return BBTNavigator.FloatFromRight;
                          }}
                          {...this.props}
                          ref='nav'
            />;
    }


    _renderPage(route, nav) {

        if (!route.page) {
            console.error('页面导航请求没有传入page or func参数.');
            return null;
        }

        let page;

        if (typeof route.page === 'function') {
            page = route.page();
        } else {
            page = route.page;
        }


        let name = route.name;
        if (!name) {
            if (page) {
                name = page.type.name;
            }
        }
        console.log(`in render page ${name}`);

        return page;
    }

    // todo 以下的方法为实现原版navigator的方法，这样做不好，但是没想到其它好办法
    getCurrentRoutes() {
        return this.refs.nav.getCurrentRoutes(...arguments);
    }
    jumpBack() {
        return this.refs.nav.jumpBack(...arguments);
    }
    jumpForward() {
        return this.refs.nav.jumpForward(...arguments);
    }
    jumpTo(route) {
        return this.refs.nav.jumpTo(...arguments);
    }
    push(route) {
        return this.refs.nav.push(...arguments);
    }
    pop() {
        return this.refs.nav.pop(...arguments);
    }
    replace(route) {
        return this.refs.nav.replace(...arguments);
    }
    replaceAtIndex(route, index) {
        return this.refs.nav.replaceAtIndex(...arguments);
    }
    replacePrevious(route) {
        return this.refs.nav.replacePrevious(...arguments);
    }
    immediatelyResetRouteStack(routeStack) {
        return this.refs.nav.immediatelyResetRouteStack(...arguments);
    }
    popToRoute(route) {
        return this.refs.nav.popToRoute(...arguments);
    }
    popToTop() {
        return this.refs.nav.popToTop(...arguments);
    }

}

module.exports = Navigator2;
