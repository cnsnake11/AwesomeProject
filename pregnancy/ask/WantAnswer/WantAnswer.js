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
    NativeModules,
} from 'react-native';

import Header from '../Header/Header';
import WantAnswerObj from './WantAnswerObj';
import AskUserInfo from '../AskUserInfo/AskUserInfo';
import {
    Mask,
    Loading,
    DateApi,
    KeyboardSpacer,
    Util,
} from '../../comm';

class WantAnswer extends Component {

    componentWillMount() {

        this.state = {
            content: '',
            initAnimateing: true,
            showLoading: false,
        };

        this.wantAnswerObj = new WantAnswerObj(this);

        InteractionManager.runAfterInteractions(() => this.setState({initAnimateing: false, }));
    }

    componentWillUnmount() {
        // this.props.askDetailObj.stop = false;
    }

    render() {
        let winW = Dimensions.get('window').width;
        let winH = Dimensions.get('window').height;
        let data = this.props.data;
        return (

            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
                >
                <Header title={'回复#' + (data.nickname || data.user.nickname)} nav={this.props.nav} />

                <ScrollView ref='scrollView'
                            keyboardShouldPersistTaps={true}
                            style={{flex: 1, }}>

                <View
                    style={{
                        padding: 15,
                        backgroundColor: '#fff',
                    }}
                    >

                    <AskUserInfo data={data.user || data}
                        style={{
                            marginBottom: 10,
                        }}
                        />

                    <Text
                        style={{
                            color: '#333',
                            fontSize: 16,
                            lineHeight: 24,
                        }}
                        >
                        {data.title}
                    </Text>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                    }} >
                        <Image source={require('../AskDetail/img/clock.png')}
                               style={{
                                   width: 13,
                                   height: 13,
                                   marginRight: 3,
                               }} />
                        <Text style={{
                            color: '#999',
                        }} >
                            {DateApi.getTimeFromGive(data.createTs)}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        padding: 10,
                    }}
                    >

                    <View
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            backgroundColor: '#fff',
                        }}
                        >

                        {
                            this.state.initAnimateing === false ?
                                <TextInput
                                    style={{
                                        height: 100,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        backgroundColor: '#fff',
                                        fontSize: 16,
                                        textAlignVertical: "top"
                                    }}
                                    autoFocus={true}
                                    multiline={true}
                                    placeholder={'回复#' + (data.nickname || data.user.nickname)}
                                    onChangeText={(text) => this.setState({content: text, })}
                                    value={this.state.text}
                                    />
                                :
                                <View
                                    style={{
                                        height: 100,
                                        backgroundColor: '#fff',
                                    }}
                                    />
                        }
                    </View>

                </View>


                <Button title='回 答'
                        disable={!this.wantAnswerObj.validate()}
                        data={data}
                        onPress={this.wantAnswerObj.submit.bind(this.wantAnswerObj)}
                    />


                    <Mask show={this.state.showLoading}
                          style={{opacity: 0, }}/>
                    <Loading show={this.state.showLoading}
                             theme='gray'
                             style={{position: 'absolute', width: winW, bottom: 10, }}/>

                </ScrollView>

                <KeyboardSpacer
                    onShow={() => {
                        Util.scrollBottom(this.refs.scrollView);
                    }}
                    onHide={() => {
                        this.refs.scrollView.scrollTo({y: 0});
                    }}
                    />

            </View>

        );
    }
}


class Button extends Component {

    render() {
        return (
            <TouchableOpacity style={{
                backgroundColor: this.props.disable === true ? '#ddd' : '#81DBDE',
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                alignSelf: 'flex-end',
                position: 'relative',
                marginRight: 10,
            }}
                onPress =
                    {
                        this.props.disable === true ? null : this.props.onPress
                    }
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
            </TouchableOpacity>
        );
    }

}

module.exports = WantAnswer;
