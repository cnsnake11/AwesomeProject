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
    Animated,
    Easing,
} from 'react-native';

import {
    ListViewBindUrl,
    Loading,
    DateApi,
    BBPageRouterRNM,
    BBUserDataRNM,
    bbtFetch,
    Mask,
    AnimatedView,
} from '../../comm';

import Header from '../Header/Header';
import AskDetailObj from './AskDetailObj';
import AskUserInfo from '../AskUserInfo/AskUserInfo';
import WantAnswer from '../WantAnswer/WantAnswer';
import AskAgain from '../WantAsk/AskAgain';
import AskListObj from '../AskList/AskListObj';

let rotateNum = 30;
let stop = false;
class AskDetail extends Component {


    componentWillMount() {

        this.state = {
            initQuerying: true,

            adData: null,
            userData: null,
            angle: new Animated.Value(0),
            showLoading: false,
        };


        this.askDetailObj = new AskDetailObj(this);
        this.askDetailObj.initQuery();
        InteractionManager.runAfterInteractions(() => {
            this.setState({initAnimateing: false, });
        });
    }
    /*componentDidMount() {
        stop = false;
    }
    componentWillUnmount(nextProps) {
        stop = true;
    }
    _animate() {
        rotateNum = -rotateNum;
        Animated.timing(this.state.angle, {
            toValue: rotateNum,
            duration: 400,
            easing: Easing.linear
        }).start(() => !stop && this._animate());
        return true;
    }*/
    render() {

        let data = this.props.data;
        let qd = this.askDetailObj.queryData;
        let nav = this.props.nav;
        let adData = this.state.adData;
        return (

            <View
                style={{
                    backgroundColor: '#fcf8f5',
                    flex: 1,
                }}>


                {this.state.initQuerying === false && this.state.initAnimateing === false ?
                    <Header title='问答详情' nav={nav}
                            rightBtn='分享'
                            rightBtnPress={this.askDetailObj.showShare.bind(this.askDetailObj)}
                        />
                    :
                    <Header title='问答详情' nav={nav} />
                }

                <View style={{flex: 1}}>

                {
                    this.state.initQuerying === false && this.state.initAnimateing === false ?
                        (
                            this.askDetailObj.listInitData.length === 0 ?
                            <ScrollView>
                                <Question askDetailObj={this.askDetailObj} data={qd} style={{marginBottom: 10, }} />
                                <AnimatedView type='fromRight' delay={100} index={0} >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}
                                    >

                                    {
                                        this.askDetailObj.isQuestionOwner() ?
                                            <Image
                                                source={require('./img/ok.png')}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    resizeMode: 'stretch',
                                                    marginRight: 6,
                                                    marginLeft: 15,
                                                    flex: 0,
                                                }}
                                            />
                                            :
                                            <Animated.Image
                                                source={require('./img/baby.gif')}
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    resizeMode: 'stretch',
                                                    marginRight: 6,
                                                    marginLeft: 15,
                                                    transform: [{
                                                        rotate: this.state.angle.interpolate({
                                                            inputRange: [-30, 0, 30],
                                                            outputRange: ['30deg', '0deg', '-30deg']
                                                        })
                                                    }],
                                                    flex: 0,
                                                }}
                                            />
                                    }


                                    {
                                        this.askDetailObj.isQuestionOwner() ?
                                            <Text style={{
                                                width: 240,
                                                color: '#666',
                                                lineHeight: 20,
                                                flex: 1,
                                                paddingRight: 15,
                                            }}>恭喜您提问成功啦，稍等一下就会有热心妈妈回答您的问题啦！</Text>
                                            :
                                            <Text style={{color: '#ccc', }}>还没有回答，快来帮帮这位妈妈吧~</Text>
                                    }
                                </View>
                                </AnimatedView>
                                <Ad data={adData} askDetailObj={this.askDetailObj}/>
                                <RelatedList nav={nav} data={qd} askDetailObj={this.askDetailObj}/>
                            </ScrollView>
                            :
                            <ListViewBindUrl
                                ref='list'
                                getUrl={this.askDetailObj.getUrl.bind(this.askDetailObj)}
                                getData={this.askDetailObj.getData.bind(this.askDetailObj)}
                                renderRow={this.renderRow.bind(this)}
                                initData={this.askDetailObj.listInitData}
                                totalRows={qd.answerCount}
                                renderHeader={() => {
                                    return (
                                        <View>
                                            <Question askDetailObj={this.askDetailObj} data={qd} style={{marginBottom: 10, }} />
                                            <Ad data={adData} askDetailObj={this.askDetailObj}/>
                                        </View>
                                    );
                                }}
                                renderFooter={(list) => {
                                    if (!list.isMoreData()) {
                                        return (
                                            <RelatedList nav={nav} data={qd} askDetailObj={this.askDetailObj}/>
                                        );
                                    }
                                }}
                                rowDataKey='id'
                                noDataMsg='没有更多的回答了.'
                                topBtn={true}
                                animateRow={false}
                            />
                        )
                        :
                        <View style={{
                            flex: 1,
                        }}>
                            <Question askDetailObj={this.askDetailObj} data={data} />
                            <Loading show={true} />
                        </View>
                }


                {
                    this.state.initAnimateing === false && this.state.initQuerying === false ?
                        <WantAnswerBtn data={qd} nav={nav} askDetailObj={this.askDetailObj}/>
                        :
                        null
                }

                <Mask show={this.state.showLoading}
                      style={{opacity: 0, }}/>
                <Loading show={this.state.showLoading}
                         theme='gray'
                         style={{position: 'absolute', width: Dimensions.get('window').width,
                                                     bottom: Dimensions.get('window').height / 2 - 30, }}/>

                </View>
            </View>
        );

    }

    renderRow(data) {
        return <Answer data={data} qd={this.askDetailObj.queryData} userData={this.state.userData} askDetailObj={this.askDetailObj} nav={this.props.nav} />;
    }

}


class Ad extends Component {

    render() {
        let data = this.props.data;

        if (!data) {
            return <View style={{height: 110, backgroundColor: '#fff'}} />;
        }

        if (!data.ad_img) {
            return null;
        }

        return (
            <TouchableOpacity
                onPress={() => this.props.askDetailObj.openAd()}
                style={{
                    marginBottom: 10,
                }}
                >
                <Image source={{uri: data.ad_img}}
                    style={{
                        width: Dimensions.get('window').width,
                        height: 100,
                        resizeMode: 'stretch',
                        backgroundColor: '#fff'
                    }}
                    />
            </TouchableOpacity>
        );
    }
}

class ContentImages extends Component {

    render() {

        let imgs = this.props.data;

        if (!imgs || imgs.length === 0) {
            return null;
        }

        let width = this.props.width || Dimensions.get('window').width - 30;

        return (
            <View style={this.props.style}>
                {
                    imgs.map((img) =>
                        <Image
                            source={{
                                uri: img.small_src,
                            }}
                            style={{
                                width: width > img.small_width / 1 ? img.small_width / 1 : width,
                                height: img.small_height / 1,
                                overflow: 'hidden',
                            }} />
                    )
                }
            </View>
        );
    }

}

class Question extends Component {

    render() {

        let data = this.props.data;
        let askDetailObj = this.props.askDetailObj;

        let img;
        if (data.status === 'closed' || data.status === 'deleted') {
            img = 'yijiejue';
        }

        return (
            <View style={[this.props.style, {
                padding: 15,
                backgroundColor: '#fff',
            }]}>
                <AskUserInfo style={{
                    marginBottom: 10,
                }}
                  data={this.props.data.user || this.props.data}
                          img={img}
                    />

                <Text style={{
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#333',
                }} >{askDetailObj.processHtml(data.title)}</Text>

                <ContentImages data={data.content_images}
                    style={{
                        marginTop: 5,
                    }}
                    />

                <View style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }} >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} >
                        <Image source={require('./img/clock.png')}
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
                    <Text style={{
                        color: '#ff537b',
                    }} >
                        {data.answerCount}条回答
                    </Text>
                </View>
            </View>
        );
    }
}

class Answer extends Component {

    render() {

        let data = this.props.data;
        let askDetailObj = this.props.askDetailObj;
        let nav = this.props.nav;
        let qd = askDetailObj.queryData;

        let bg = '#fff';
        let img;

        if (data.isBest === 'best') {
            bg = '#fffdf7';
            img = 'zuijia';
        }

        return (
            <View style={[
                this.props.style,
                {
                    padding: 15,
                    backgroundColor: bg,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                },
            ]}>
                <AskUserInfo style={{
                    marginBottom: 10,
                }}
                    data={data.user}
                    img={img}
                    nav={nav}
                    bestBtn={askDetailObj.canBest()}
                    bestBtnPress={() => askDetailObj.bestBtnPress(qd, data)}
                    />

                <Text style={{
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#333',
                }} >{askDetailObj.processHtml(data.content)}</Text>

                <View style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }} >
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} >
                        <Image source={require('./img/clock.png')}
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


                    {
                        askDetailObj.canAnswerAgain(data) ?
                            <AnswerInnerBtn title='追问'
                                            data={data}
                                            img={require('../WantAsk/img/edit.png')}
                                onPress={() => nav.push({
                                    page: <AskAgain nav={nav} qd={this.props.qd} userData={this.props.userData} askDetailObj={askDetailObj} data={data}/>
                                })} />
                            :
                            null
                    }


                    {
                        askDetailObj.canRate(data) === true ?
                            <AnswerInnerBtn title={'有用' + data.rateCount}
                                onPress={() => askDetailObj.setAnswerRate(data)}/>
                            :
                            <AnswerInnerBtn title={'有用' + data.rateCount} disable={true} />
                    }

                </View>

                <ReplyList data={data.reply}/>

            </View>
        );
    }
}

class RelatedList extends Component {
    render() {
        let dt = this.props.data.relate_list.list;
        if (dt.length === 0) {
            return null;
        }

        let textStyle = {
            flex: 1,
            color: '#a3a3a3',
        };
        let nav = this.props.nav;
        return (<View style={{
            backgroundColor: '#fff',
        }}>
            <View style={{
                backgroundColor: '#ececec',
                justifyContent: 'center',
                padding: 9,
            }}>
                <Text>相关问答</Text>
            </View>
            {
                dt.map((data) => {
                    return <TouchableOpacity
                        onPress={() => nav.push({
                            page: <AskDetail nav={nav} data={data}/>
                        })}
                        key={data.id}>
                        <View style={[
                            this.props.style,
                            {
                                paddingLeft: 15,
                                paddingRight: 15,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottomWidth: 1,
                                borderTopWidth: 1,
                                borderBottomColor: '#ddd',
                                borderTopColor: '#ddd',
                                marginBottom: 10
                            },
                        ]}>
                            <View style={{
                                flexDirection: 'row',
                                color: '#666',
                            }}>
                                <Image
                                    style={{
                                        width: 10,
                                        height: 12,
                                        resizeMode: 'stretch',
                                        marginRight: 3,
                                    }}
                                    source={require('../AskList/img/user.png')}/>
                                <Text style={textStyle}>{data.nickname}</Text>
                                <Text style={textStyle}>
                                    {DateApi.getTimeFromGive(data.createTs)}
                                </Text>
                                <Text style={[textStyle, {
                                    flex: 0
                                }]}>
                                    {data.babyAge || '备孕'}
                                </Text>
                            </View>
                            <Text style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                lineHeight: 20
                            }}>
                                {data.title}
                            </Text>
                        </View>
                    </TouchableOpacity>;
                })
            }
        </View>);
    }
}

class AnswerInnerBtn extends Component {

    constructor() {
        super();
        this.state = {
            bounceValue: new Animated.Value(1),
        };
    }

    componentWillReceiveProps(props2) {

        if (this.props.disable === props2.disable) {
            return;
        }

        if (props2.disable === true) {
            this._animate();
        }

    }

    _animate() {
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 1,
                friction: 0.8,
            }
        ).start();
    }

    render() {


        let disable = this.props.disable;
        let data = this.props.data;
        if (data && (data.status === 'closed' || data.status === 'deleted')) {
            return null;
        }

        let Tag = disable === true ? View : TouchableOpacity;

        let img;
        if (this.props.img) {
            img = this.props.img;
        } else {
            let good = require('./img/good.png');
            let goodGray = require('./img/good-gray.png');
            img = disable === true ? goodGray : good;
        }

        return (
            <Animated.View style={{transform: [{scale: this.state.bounceValue}], }}>
            <Tag
                style={[this.props.style, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 8,
                }]}
                onPress={() => {
                    return disable === true ? null : this.props.onPress();
                }}>

                <Image source={img}
                       style={{
                           width: 13,
                           height: 13,
                           marginRight: 1,
                       }} />
                <Text style={{
                    color: disable === true ? '#ccc' : '#ff537b',
                }} >
                    {this.props.title}
                </Text>
            </Tag>
            </Animated.View>
        );
    }
}

class ReplyList extends Component {

    render() {

        let replies = this.props.data;

        if (replies.length === 0) {
            return null;
        }

        return (
            <View
                style={{
                    marginTop: 5,
                }}
                >

                <View
                    style={{
                        padding: 10,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#e7e7e7',
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                    >
                    {
                        replies.map((reply) => <Reply data={reply}/>)
                    }
                </View>

                <Image
                    source={require('./img/up.png')}
                    style={{
                        width: 20,
                        height: 10,
                        resizeMode: 'stretch',
                        position: 'absolute',
                        left: 30,
                        top: 1
                    }}
                    />

            </View>

        );
    }
}

class Reply extends Component {

    render() {

        let data = this.props.data;
        let width = Dimensions.get('window').width - 50;

        return (

            <View>
                <View
                    style={{
                        padding: 5,
                    }}
                    >
                    <Text
                        style={{
                            color: '#666',
                        }}
                        >
                        <Text
                            style={{
                                color: '#ff848a',
                            }}
                            >
                            {data.nickname}:
                        </Text>
                        {data.content}
                    </Text>
                </View>
                <ContentImages data={data.content_images} width={width}/>
            </View>

        );
    }
}


class WantAnswerBtn extends Component {
    render() {
        let data = this.props.data;

        let canAnswer = this.props.askDetailObj.canAnswer();

        let text = '我来回答';
        if (!canAnswer) {
            text = '查看更多问答';
        }

        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: '#f1f1f1',
                    width: Dimensions.get('window').width,
                }}
                >
                <TouchableOpacity data={data}
                                  askListObj={this.props.askListObj}
                                  onPress={() => {
                    if (!canAnswer) {
                        this.props.nav.popToTop();
                        return;
                    }
                    BBUserDataRNM.isLogin().then((res) => {
                        if (res.data === false) { // 未登录
                            return BBPageRouterRNM.showLoginPage();
                        }
                    }).then(() => {
                        this.props.nav.push({
                            page: <WantAnswer need={AskDetail} data={data} askDetailObj={this.props.askDetailObj} nav={this.props.nav}/>,
                        });
                    });

                }}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: '#81DBDE',
                            borderRadius: 2,
                        }}
                        >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: '700',
                            }}
                            >
                            {text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = AskDetail;
