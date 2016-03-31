
'use strict';

import React, {
    Component,
    StyleSheet,
    View,
    Platform,
    Image,
    ListView,
    Dimensions,
    ScrollView,
    NativeModules,
} from 'react-native';

class Util {

    /**
     * 滚动到scrollview的最底端
     * @param scrollView
     */
    static scrollBottom(scrollView) {
        if (Platform.OS === 'android') { // android可以直接9999，ios不行，会滚出去
            scrollView.scrollTo({y: 9999});
        } else {
            NativeModules.UIManager.measure(scrollView.getInnerViewNode(),
                (...arg) => {// x y width height pageX pageY
                    let contentHeight = arg[3];
                    NativeModules.UIManager.measure(scrollView.getScrollableNode(),
                        (...arg2) => {
                            let scrollHeight = arg2[3];
                            let scrollY = contentHeight - scrollHeight;// 内容高-容器高
                            if (scrollY > 0) { // 小于等于0说明没有滚动条不用滚动
                                scrollView.scrollTo({y: scrollY});
                            }
                        });

                });
        }
    }

    /**
     * 刷新页面，route可以为空，会刷新当前页面
     * @param nav
     * @param route
     */
    static refresh(nav, route) {

        if (!route) {
            let routes = nav.getCurrentRoutes();
            let length = routes.length;
            route = routes[length - 1];
        }

        // todo 最好的方式是直接使用route.page，但是不好使，这种写法只支持一层节点，如果有多层会有问题
        let Tag = route.page.type;
        nav.replace({
            page: <Tag {...route.page.props} />,
        });

    }

}

module.exports = Util;
