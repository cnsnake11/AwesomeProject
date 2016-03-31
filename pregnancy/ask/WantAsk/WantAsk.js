'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Image,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ViewPagerAndroid,
    InteractionManager,
    Dimensions,
    ScrollView,
    Animated,
} from 'react-native';

import Header from '../Header/Header';
import WantAskObj from './WantAskObj';

import {
    Mask,
    Loading,
    Checkbox,
    Util,
    KeyboardSpacer,
} from '../../comm';

class WantAsk extends Component {

    componentWillMount() {

        this.maxLength = 80;

        this.state = {
            title: '',
            anony: false,

            initAnimateing: true,
            showLoading: false,

            photo: null,
        };

        this.wantAnswerObj = new WantAskObj(this);

        InteractionManager.runAfterInteractions(() => this.setState({initAnimateing: false, }));
    }


    render() {

        let winW = Dimensions.get('window').width;
        let winH = Dimensions.get('window').height;


        return (

            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
                >
                <Header title='我要提问' nav={this.props.nav} backIsClose={this.props.backIsClose}/>

                <View
                    style={{
                        padding: 10,
                        flex: 1,
                    }}
                    keyboardShouldPersistTaps={true}
                    >

                    <View
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            flex: 1,
                            backgroundColor: '#fff',
                        }}
                        >

                        {
                            this.state.initAnimateing === false ?
                                <TextInput
                                    style={{
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        fontSize: 16,
                                        backgroundColor: '#fff',
                                        textAlignVertical: "top"
                                    }}
                                    autoFocus={true}
                                    multiline={true}
                                    placeholder='为了更好地了解您的问题，请在提问时更详尽的表述症状，必要时附上图片。'
                                    onChangeText={(text) => this.setState({title: text, })}
                                    value={this.state.text}
                                    />
                                :
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                    />
                        }

                        <MaxLengthMsg maxLegth={this.maxLength} str={this.state.title} />

                    </View>


                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flex: 0,
                        }}
                        >
                        <AnimateView index={1}>
                            <TouchableOpacity onPress={() => this.wantAnswerObj.photoOrPreview()}>
                            {
                                this.state.photo ?
                                    <Image source={{uri: this.state.photo.thumb_info.smallsquare.photo_url}}
                                           style={{width: 50, height: 50, resizeMode: 'stretch'}}/>
                                    :
                                    <Image
                                        source={require('./img/photo.jpeg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            resizeMode: 'stretch',
                                            marginLeft: 5,
                                        }}
                                    />
                            }
                            </TouchableOpacity>
                        </AnimateView>

                        <AnimateView index={2}>
                        <TouchableOpacity onPress={() => this.setState({anony: !this.state.anony, })}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 5,
                            }}
                            activeOpacity={1}
                            >
                            <Text
                                style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}
                                >
                                匿名
                            </Text>
                            <Checkbox style={{marginLeft: 2, }}
                                      value={this.state.anony}
                                      onPress={() => this.setState({anony: !this.state.anony, })}/>
                        </TouchableOpacity>
                        </AnimateView>

                        <AnimateView index={3}>
                        <Button title='发表提问' disable={!this.wantAnswerObj.validate()}
                                onPress={this.wantAnswerObj.submit.bind(this.wantAnswerObj)}
                            />
                        </AnimateView>

                    </View>


                    <Mask show={this.state.showLoading}
                          style={{opacity: 0, }}/>
                    <Loading show={this.state.showLoading}
                             theme='gray'
                             style={{position: 'absolute', width: winW, bottom: 10, }}/>
                </View>

                <KeyboardSpacer/>

            </View>

        );
    }
}


class AnimateView extends Component {

    componentWillMount() {
        this.win = Dimensions.get('window');
        this.state = {
            offset: new Animated.Value(this.win.height),
        };
    }


    render() {// index从1开始

        if (this.fired !== true) {
            this.fired = true;

            setTimeout(() => {
                Animated.timing(
                    this.state.offset,
                    {toValue: 0, duration: 300}
                ).start();
            }, (Platform.OS === 'android' ? 700 : 1000) + this.props.index * 80);

        }

        return (
            <Animated.View style={{position: 'relative', bottom: this.state.offset}}>
                {this.props.children}
            </Animated.View>
        );
    }
}

class MaxLengthMsg extends Component {


    // 输入的问题过长，超出了xx字
    // 还可以输入xx字
    render() {

        let str = this.props.str;
        let maxLength = this.props.maxLegth / 1;

        let pre = '还可以输入';
        let num = maxLength;

        if (str && str.trim() && str.length > maxLength) {// 超出了
            num = str.length - maxLength;
            pre = <Text><Text style={{color: '#cc0033', fontSize: 12, }}>输入的问题过长！</Text>超出了</Text>;
        } else if (str && str.trim()) {// 符合要求 且 有输入
            num = maxLength - str.length;
        }


        return (
            <View
                style={[this.props.style, {
                    backgroundColor: 'transparent',
                    alignItems: 'flex-end',
                    marginRight: 10,
                    marginBottom: 2,
                }]}
                >
                <Text style={{color: '#666', fontSize: 12, }}>
                    {pre}
                    <Text style={{color: '#cc0033', }}>
                        {num}
                    </Text>
                    字
                </Text>
            </View>
        );
    }

}

class Button extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress =
                {
                    this.props.disable === true ? null : this.props.onPress
                }
                >
                <View
                    style={{
                        backgroundColor: this.props.disable === true ? '#ddd' : '#ff597c',
                        padding: 10,
                        borderRadius: 5,
                        alignSelf: 'flex-end',
                        position: 'relative',
                        marginLeft: 5,
                    }}
                    >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            textAlign: 'center',
                        }}
                        >
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}

module.exports = WantAsk;
