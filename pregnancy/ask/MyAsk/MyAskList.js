
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

import CommonListObj from '../comm/CommonListObj';

class MyAskList extends Component {
    componentWillMount() {
        this.ListObj = new CommonListObj(this);
        let listObj = this.ListObj;
        let type = this.props.type;
        listObj.url = 'api/mobile_ask/my_answers?limit=10';
        if (type === 'question') {
            this.ListObj.url = 'api/mobile_ask/my_question?limit=10';
        }
    }
    render() {
        return (
            this.props.canInit === true ?
                <ListViewBindUrl
                    {...this.props}
                    getUrl={this.ListObj.getUrl.bind(this.ListObj)}
                    getData={this.ListObj.getData.bind(this.ListObj)}
                    renderRow={this.renderRow.bind(this)}
                    rowDataKey='id'
                    animateRow={false}
                />
                :
                null
        );
    }

    renderRow(data) {
        let textStyle = {
            flex: 1,
            color: '#a3a3a3',
        };
        return (
            <TouchableOpacity
                onPress={() => {
                    this.ListObj.goToDetail(data);
                }}
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
                            {this.ListObj.getTime(data.createTs)}
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
            </TouchableOpacity>
        );
    }
}

module.exports = MyAskList;
