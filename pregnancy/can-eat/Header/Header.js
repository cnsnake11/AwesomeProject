
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

    render() {

        if (Platform.OS === 'android') { // 解决android中能不能吃主页返回时候如果键盘是弹出状态，再进入会报错
            return (
                <ScrollView style={{flex: 0, }}
                    keyboardShouldPersistTaps={false} scrollEnabled={false}>
                    {this._tpl()}
                </ScrollView>
            );
        }

        return this._tpl();

    }

    _tpl() {
        let nav = this.props.nav;

        return (
            <View style={[css.titleView, {flex: 0, }, React.Platform.OS === 'ios' ? css.iosTitleView : '', this.props.style]}>

                <TouchableOpacity style={[css.titleBtnTouch]}
                                  onPress={() => {
                                      if (nav) {
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
                    this.props.rightBtn ?
                        <TouchableOpacity shareImg={this.props.shareImg} style={[css.titleBtnTouch]} onPress={this.props.rightBtnPress} >
                            <Text style={[css.titleBtnText]}>{this.props.rightBtn}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[css.titleBtnTouch]} >
                            <Text style={[css.titleBtnText]}> </Text>
                        </TouchableOpacity>
                }

            </View>
        );
    }

}

module.exports = Header;
