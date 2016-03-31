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
    Image,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ViewPagerAndroid,
    InteractionManager,
    Dimensions,
    ScrollView,
} from 'react-native';


import {
    Loading,
    ListViewBindUrl,
} from '../../comm';

import Header from '../Header/Header';
import AskMyMsgObj from './AskMyMsgObj';

class AskMyMsg extends Component {
    render() {
        this.AskMyMsgObj = new AskMyMsgObj(this);
        let listObj = this.AskMyMsgObj;
        return (

            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
                >
                <Header title='我的问答消息' nav={this.props.nav}/>
                <ListViewBindUrl
                    {...this.props}
                    getUrl={listObj.getUrl.bind(listObj)}
                    getData={listObj.getData.bind(listObj)}
                    renderRow={this.renderRow.bind(this)}
                    rowDataKey='id'
                    animateRow={false}
                />
            </View>

        );
    }
    renderRow(data) {
        let textStyle = {
            flex: 1,
            color: '#a3a3a3',
        };
        let content = null;
        let type = data.type;
        if (type === 'question') {
            content = <Text>
                你的提问: "{data.title}"获得了{data.replyCount}条新回答
            </Text>;
        } else if (type === 'question_close_a' || type === 'question_close_q') {
            content = <Text>
                <Text style={{
                    color: '#ff848a'
                }}>{data.nickname}</Text>在回答: "{data.title}"中回复了你
            </Text>;
        } else if (data.type === 'question_answer_rate') {
            content = <Text>
                你的回答: "{data.title}"被{data.replyCount}个人认为很有用,继续努力吧!
            </Text>;
        } else if (data.type === 'question_answer_best') {
            content = <Text>
                你的回答: "{data.title}"被选为最佳回答啦，真给力！
            </Text>;
        }
        return (
            <TouchableOpacity
                onPress={this.AskMyMsgObj.goToDetail.bind(this.AskMyMsgObj, data)}
                key={data.id}>
                <View style={[
                    this.props.style,
                    {
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#ddd',
                    },
                ]}>
                    <Text style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        lineHeight: 20
                    }}>
                        {content}
                    </Text>
                    <View style={{
                        color: '#666',
                    }}>
                        <Text style={textStyle}>
                            {this.AskMyMsgObj.getTime(data.createTs)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = AskMyMsg;
