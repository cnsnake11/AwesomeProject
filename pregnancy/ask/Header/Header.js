
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
    ListView,
    Animated,
    Image,
    ScrollView,
} from 'react-native';

import {
    BBPageRouterRNM,
} from '../../comm';


let css = StyleSheet.create(
    {

        titleView: {
            backgroundColor: '#ff99a1',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        iosTitleView: {
            paddingTop: 17,
        },

        titleText: {
            flex: 1,
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
        },

        titleBtnTouch: {
            padding: 13,
            paddingTop: 15,
            paddingBottom: 16,
            width: 60,
        },
        titleBtnText: {
            color: '#fff',
            fontSize: 14,
            opacity: 1,
        },
    }
);

class Header extends Component {

    componentWillMount() {
        this.state = {
            offset: new Animated.Value(0),
        };
        this._animating = false;
    }


    render() {
        if (Platform.OS === 'android' && this.props.backIsClose === true) {// android直接弹出rn要先关键盘,否则会报错
            return (
                <ScrollView style={{flex: 0}}>
                    {this._tpl()}
                </ScrollView>
            );
        }

        return this._tpl();
    }

    _tpl() {

        let nav = this.props.nav;

        return (
            <Animated.View style={[
                css.titleView,
                {
                    flex: 0,
                    marginTop: this.state.offset,
                },
                React.Platform.OS === 'ios' ? css.iosTitleView : '',
                this.props.style
            ]}>


                 <TouchableOpacity style={[css.titleBtnTouch]}
                                  onPress={() => {

                                      if (nav) {
                                          let routes = nav.getCurrentRoutes();
                                          if (routes[routes.length - 1].backIsClose === true && BBPageRouterRNM) {
                                              BBPageRouterRNM.popModule();
                                              return;
                                          }
                                          nav.pop();
                                      } else if (BBPageRouterRNM) {
                                          BBPageRouterRNM.popModule();
                                      } else {
                                          console.error('获得不到导航器对象.');
                                      }
                                  }} >
                     <Image source={require('./img/back.png')}
                            style={[{width: 10, height: 18, resizeMode: 'stretch', }]} />
                </TouchableOpacity>

                 <Text numberOfLines={1} style={[css.titleText]}>{this.props.title}</Text>


                {
                    this._rightBtnTpl()
                }

            </Animated.View>
        );

    }

    _rightBtnTpl() {

        let rightBtn = this.props.rightBtn;

        if (!rightBtn) {
            return (
                <TouchableOpacity style={[css.titleBtnTouch]} >
                    <Text style={[css.titleBtnText]}> </Text>
                </TouchableOpacity>
            );
        }

        if (rightBtn === '分享') {

            let img;
            if (Platform.OS === 'android') {
                img = require('./img/share_android.png');
            } else {
                img = require('./img/share_ios.png');
            }

            return (
                <TouchableOpacity style={[css.titleBtnTouch]} onPress={this.props.rightBtnPress} >
                    <Image
                        source={img}
                        style={{
                            width: 18,
                            height: 18,
                            resizeMode: 'stretch',
                        }}
                        />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity style={[css.titleBtnTouch]} onPress={this.props.rightBtnPress} >
                <Text style={[css.titleBtnText]}>{rightBtn}</Text>
            </TouchableOpacity>
        );


    }

    componentWillReceiveProps(props2) {

        if (this.props.show === props2.show) {
            return;
        }

        if (props2.show === false) {
            this._hide();
        } else {
            this._show();
        }
    }


    _show() {
        if (this._animating === true) {
            return;
        }

        this._animating = true;

        Animated.timing(
            this.state.offset,
            {toValue: 0, duration: 300, }
        ).start(() => this._animating = false);
    }

    _hide() {
        if (this._animating === true) {
            return;
        }

        this._animating = true;

        Animated.timing(
            this.state.offset,
            {toValue: -50, duration: 300, }
        ).start(() => this._animating = false);
    }


}

module.exports = Header;
