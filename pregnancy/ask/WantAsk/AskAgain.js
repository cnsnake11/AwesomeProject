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
    Switch,
} from 'react-native';

import Header from '../Header/Header';
import AskAgainObj from './AskAgainObj';

import {
    Mask,
    Loading,
    Checkbox,
    Util,
    KeyboardSpacer,
    AnimatedView,
} from '../../comm';

class AskAgain extends Component {

    componentWillMount() {

        this.state = {
            title: '',

            initAnimateing: true,

            showLoading: false,

            photo: null,
        };

        this.wantAnswerObj = new AskAgainObj(this);

        InteractionManager.runAfterInteractions(() => this.setState({initAnimateing: false, }));
    }


    render() {

        let data = this.props.data;
        let winW = Dimensions.get('window').width;
        let winH = Dimensions.get('window').height;

        return (

            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
                >
                <Header title={'回复#' + data.user.nickname} nav={this.props.nav} />

                <View
                    style={{
                        padding: 10,
                        flex: 1,
                    }}
                    >

                    <View
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            flex: 1,
                        }}
                        >

                        {
                            this.state.initAnimateing === false ?
                                <TextInput
                                    style={{
                                        height: 160,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        backgroundColor: '#fff',
                                        fontSize: 16,
                                        textAlignVertical: "top",
                                        flex: 1,
                                    }}
                                    autoFocus={true}
                                    multiline={true}
                                    placeholder={'回复#' + data.user.nickname}
                                    onChangeText={(text) => this.setState({title: text, })}
                                    value={this.state.text}
                                    />
                                :
                                <View
                                    style={{
                                        height: 160,
                                        backgroundColor: '#fff',
                                    }}
                                    />
                        }

                    </View>


                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                        >
                        <AnimatedView type='fromUp' delay={Platform.OS === 'android' ? 700 : 1000} index={1}>
                        <TouchableOpacity onPress={() => this.wantAnswerObj.photoOrPreview()}>
                            {
                                this.state.photo ?
                                    <Image source={{uri: this.state.photo.thumb_info.smallsquare.photo_url}}
                                           style={{marginRight: 15, width: 50, height: 50, resizeMode: 'stretch'}}/>
                                    :
                                    <Image
                                        source={require('./img/photo.jpeg')}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            resizeMode: 'stretch',
                                            marginRight: 15,
                                        }}
                                        />
                            }
                        </TouchableOpacity>
                        </AnimatedView>

                        <AnimatedView type='fromUp' delay={Platform.OS === 'android' ? 700 : 1000} index={2}>
                        <Button title='回 复' disable={!this.wantAnswerObj.validate()}
                                onPress={this.wantAnswerObj.submit.bind(this.wantAnswerObj)}
                            />
                        </AnimatedView>
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
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 5,
                        alignSelf: 'flex-end',
                        position: 'relative',
                        marginRight: 10,
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

module.exports = AskAgain;
