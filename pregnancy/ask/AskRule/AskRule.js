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

class AskRule extends Component {
    render() {
        let styles = {
            title: {
                fontWeight: 'bold',
                color: '#666',
                fontSize: 16,
                marginTop: 15,
            },
            text: {
                fontSize: 14,
                lineHeight: 22,
                color: '#666'
            }
        };
        return (
            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}
            >
                <Header title='排行榜规则' nav={this.props.nav}/>
                <ScrollView style={{
                    padding: 15
                }}>
                    <Text style={styles.title}>当日排行榜</Text>
                    <Text style={styles.text}>根据宝妈们每天分享知识的答题数进行排名。</Text>

                    <Text style={styles.title}>积分排行榜</Text>
                    <Text style={styles.text}>根据宝妈们每周累计的积分数进行排名。</Text>
                    <Text style={styles.title}>积分规则</Text>
                    <Text style={styles.text}>1、回答被提问者选为最佳或者被其他用户选为有用，都可以获得相应的积分。</Text>
                    <Text style={styles.text}>每个最佳回答可获得10分。</Text>
                    <Text style={styles.text}>每个回答被选为有用一次可获得2分，每个回答获得有用积分上限为20分。</Text>
                    <Text style={styles.text}>2、不能选自己的回答为最佳回答或者有用。</Text>

                    <Text style={styles.title}>回答质量作弊惩罚审核标准</Text>
                    <Text style={styles.text}>在孕育问答中解答他人疑惑，分享自己的原创知识。为了给宝妈们提供一个高质量的互动平台，我们将对回答质量进行严格监督。</Text>

                    <Text style={styles.title}>孕育问答答题规范：</Text>
                    <Text style={styles.text}>宝妈们在回答问题时，请根据自身的经验认真为其他麻麻们进行解答。禁止复制重复答案进行答题，禁止使用大量符号或无关主题的内容进行答题，答题字数不得低于20个字。</Text>

                    <Text style={styles.title}>对于违规现象将做如下处置：</Text>
                    <Text style={styles.text}>1、答案监督管理：</Text>
                    <Text style={styles.text}>参与的宝妈们如有以下行为，将被视为“违规”，“违规”行为一经发现，查核属实后将给予警告，严重者封停宝宝树账号。</Text>
                    <Text style={styles.text}>* 回答问题与主题无关，或用相同答案回答不同问题。</Text>
                    <Text style={styles.text}>* 采用对提问者无帮助的答案，比如“呵呵”“我也不知道”“还是去医院吧”之类。</Text>
                    <Text style={styles.text}>* 过于简短的答案占较大比例，从其他网站黏贴的答案占较大比例。</Text>
                    <Text style={styles.text}>* 直接复制其他回答者的答案。</Text>
                    <Text style={styles.text}>* 使用马甲进行互选为最佳答案等作弊行为。</Text>
                    <Text style={styles.text}>* 严禁用相同答案回复语义接近的其他相关问题。</Text>
                    <Text style={styles.text}>2、对帐号的管理原则:</Text>
                    <Text style={styles.text}>凡含有下列行为之一者，宝宝树孕育问答平台有权删除其相应帐号，情节严重者，将酌情封禁对应IP。</Text>
                    <Text style={styles.text}>* 作弊</Text>
                    <Text style={styles.text}>* 广告</Text>
                    <Text style={styles.text}>* 黄反</Text>
                    <Text style={styles.text}>* 灌水</Text>
                    <Text style={styles.text}>* 不文明</Text>
                    <Text style={styles.text}>* 抄袭</Text>
                    <Text style={styles.text}>* 模仿宝宝树园丁ID，用以假冒园丁或破坏园丁形象 。</Text>
                    <Text style={styles.text}>* 模仿或盗用他人ID个人签名包含有严重影响网友浏览的内容或格式。</Text>
                    <Text style={styles.text}>* 其他扰乱宝宝树孕育问答秩序行为的情况。</Text>
                </ScrollView>
            </View>
        );

    }

}

module.exports = AskRule;
