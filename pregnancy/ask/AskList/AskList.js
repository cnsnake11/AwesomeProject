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
    Animated,
    Dimensions,
    Easing,
} from 'react-native';


import {
    ListViewBindUrl,
    Loading,
    BBUserDataRNM,
    BBPageRouterRNM,
} from '../../comm';

import AskListObj from './AskListObj';
import WantAnswer from '../WantAnswer/WantAnswer';

class AskList extends Component {

    componentWillMount() {
        this.askListObj = new AskListObj(this);
    }

    shouldComponentUpdate(nextProps, nextState) { // 此处算法是为了保证tab滑动的流畅性
        return !this.props.canInit && nextProps.canInit;
    }

    render() {

        return (

            this.props.canInit === true ?
            <ListViewBindUrl
                {...this.props}
                style={{
                    marginTop: 10,
                }}
                getUrl={this.askListObj.getUrl.bind(this.askListObj)}
                getData={this.askListObj.getData.bind(this.askListObj)}
                renderRow={this.renderRow.bind(this)}
                topBtn={true}
                rowDataKey='id'
                pullDownRefresh={true}
                ref='list'
                animateRow={true}
                />
                :
                null
        );

    }


    renderRow(data, sectionID, rowNum) {

        if (data.ansNum) {

            if (data.ansNum === '0') {
                return null;
            }


            return (
                <View style={{paddingLeft: 10, marginBottom: 10, flexDirection: 'row', }}>
                    <Text style={{color: '#a3a3a3', }}>
                        您帮助了
                        <Text style={{color: '#ff537b', }}>
                            {data.ansNum}
                        </Text>
                        位麻麻
                    </Text>

                    {
                        data.useNum !== '0' ?
                            <Text style={{color: '#a3a3a3', }}>
                                ,收获
                                <Text style={{color: '#ff537b', }}>
                                {data.useNum}
                                </Text>
                                份称赞!
                            </Text>
                            :
                            null
                    }

                </View>
            );
        }

        if (!data.id && data.title && data.url) {
            return (
                <TouchableOpacity onPress={() => this.askListObj.openHd(data.url)}
                    style={{backgroundColor: '#fff',
                flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 10}}>
                    <View style={{backgroundColor: '#81DBDE', padding: 3, marginRight: 3, borderRadius: 2}}>
                        <Text style={{color: '#fff', }}>活动</Text>
                    </View>
                    <View style={{flex: 1, }}>
                        <Text style={{color: '#444', }}>{data.title}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return <Row data={data} rowNum={rowNum} nav={this.props.nav} askListObj={this.askListObj}/>;
    }

}

class Row extends Component {

    componentWillMount() {
        this.win = Dimensions.get('window');
        this.state = {
            offset: new Animated.Value(this.win.width),
        };
    }

    render() {

        let {data, rowNum, nav, } = this.props;
        this.askListObj = this.props.askListObj;

        return (
            <TouchableOpacity
                data={data}
                onPress={this.askListObj.goToDetail.bind(this.askListObj, data)}
                style={{
                    marginBottom: 10,
                }}
                key={data.id}>
                <View style={{
                    backgroundColor: '#fff',
                    borderTopColor: '#dededf',
                    borderTopWidth: 1,
                    borderBottomColor: '#dededf',
                    borderBottomWidth: 1,
                }}>
                    <UserInfo data={data} askListObj={this.askListObj}/>
                    <AskInfo data={data} askListObj={this.askListObj} />
                    {
                        this.askListObj.showBtn(data) === true ?
                            <BottomButton data={data} askListObj={this.askListObj} nav={this.props.nav} />
                            :
                            <BottomInfo data={data} />
                    }

                </View>

            </TouchableOpacity>
        );
    }
}

class UserInfo extends Component {

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    paddingBottom: 0,
                }}>
                <Image source={require('./img/user.png')}
                    style={{
                        width: 10,
                        height: 12,
                        resizeMode: 'stretch',
                        marginRight: 3,
                    }}/>
                <Text
                    style={{
                        color: '#a3a3a3',
                        width: 110,
                        fontSize: 12,
                    }}>
                    {this.props.data.nickname}
                </Text>
                <Text
                    style={{
                        color: '#a3a3a3',
                        fontSize: 12,
                    }}>
                    {this.props.askListObj.getTime(this.props.data.createTs)}
                </Text>
                <Text
                    style={{
                        color: '#a3a3a3',
                        position: 'absolute',
                        right: 15,
                        fontSize: 12,
                    }}>
                    {this.props.data.babyAge || '备孕'}
                </Text>
            </View>
        );
    }
}


class AskInfo extends Component {

    render() {
        return (
            <View style={{
                padding: 10,
            }}>
                <Text
                    style={{
                        color: '#333',
                        lineHeight: 24,
                    }}>
                    {this.props.data.title}
                </Text>
            </View>
        );
    }

}

class BottomButton extends Component {

    render() {

        let data = this.props.data;
        let nav = this.props.nav;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#dededf',
                    flex: 1,
                }}>

                <BottomButtonInfo title={'回答数' + this.props.data.answerCount} />

                {
                    data.hasAnswered === '0' ?
                        <Button title='立刻回答'
                                onPress={() => {

                                    BBUserDataRNM.isLogin().then((res) => {
                                        if (res.data === false) { // 未登录
                                            return BBPageRouterRNM.showLoginPage();
                                        }
                                    }).then(() => {
                                        nav.push({
                                            page: <WantAnswer askListObj={this.props.askListObj} type='like' nav={nav} data={data}/>
                                        });
                                        /*this.props.AskIndexObj.showAskInput();*/
                                    });

                                }} />
                        :
                        <Button title='已回答' disable={true} />
                }

            </View>
        );
    }

}

class BottomButtonInfo extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                borderRightWidth: 1,
                borderRightColor: '#dededf',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                flexDirection: 'row',
            }}>
                <Image style={{
                    width: 10,
                    height: 10,
                    resizeMode: 'stretch',
                    marginRight: 5,
                }}
                   source={require('./img/msg.png')}/>
                <Text style={{
                    fontSize: 12,
                }}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

class Button extends Component {
    render() {

        let Tag = TouchableOpacity;
        if (this.props.disable === true) {
            Tag = View;
        }

        return (
            <Tag style={{flex: 1, }} onPress={this.props.onPress}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    flexDirection: 'row',
                }}>
                    <Image style={{
                        width: 10,
                        height: 10,
                        resizeMode: 'stretch',
                        marginRight: 5,
                    }}
                           source={require('./img/edit.png')}/>
                    <Text style={{
                        color: '#66c4ff',
                        fontSize: 12,
                    }}>
                        {this.props.title}
                    </Text>
                </View>
            </Tag>
        );
    }
}

class BottomInfo extends Component {

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 15,
                    paddingBottom: 10,
                }}>

                <Image style={{
                    width: 10,
                    height: 10,
                    resizeMode: 'stretch',
                    marginRight: 5,
                }}
                       source={require('./img/msg.png')}/>
                <Text style={{
                    fontSize: 12,
                    color: '#a3a3a3',
                }}>
                    {this.props.data.answerCount}
                </Text>
            </View>
        );
    }
}

module.exports = AskList;
