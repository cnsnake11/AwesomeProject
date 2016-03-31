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

class AskTopList extends Component {
    componentWillMount() {
        this.state = {
            initAnimateing: true,
            initQuerying: true
        };
        this.ListObj = new CommonListObj(this);
    }

    render() {
        let type = this.props.type;
        let prefix = 'api/mobile_ask_ranking/get_answers_list';
        if (type === 'week') {
            prefix = 'api/mobile_ask_ranking/get_list';
        }
        this.ListObj.url = prefix + '?limit=100&type=' + type;
        return (
            this.props.canInit === true ?
                <ListViewBindUrl
                    getUrl={this.ListObj.getUrl.bind(this.ListObj)}
                    getData={this.ListObj.getData.bind(this.ListObj)}
                    renderRow={this.renderRow.bind(this)}
                    rowDataKey='type'
                />
                :
                null
        );
    }

    renderRow(data, sectionID, rowID) {
        rowID = parseInt(rowID, 10) + 1;
        let topItem = null;
        if (rowID <= 3) {
            topItem = <TopThree rowID={rowID} />;
        }
        return (
            <View style={[
                this.props.style,
                {
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    flexDirection: 'row',
                },
            ]}>
                <View style={{
                    flex: 1,
                }}>
                    <Image
                        source={{
                            uri: data.user.avatar,
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                        }}
                    />
                </View>
                <View style={{
                    flex: 5,
                }}>
                    <Text style={{fontSize: 16}}>{data.user.nickname}</Text>
                    <Text style={{lineHeight: 20, fontSize: 14}}>
                        积分: <Text style={{color: '#FF5278'}}>{data.number}</Text>
                    </Text>
                </View>
                {
                    topItem
                }
            </View>
        );
    }
}
class TopThree extends Component {
    render() {
        let number = parseInt(this.props.rowID, 10);
        let textColor = '#fc0';
        if (number === 2) {
            textColor = '#FFBABC';
        } else if (number === 3) {
            textColor = '#FF755C';
        }
        let style = {
            color: textColor,
            width: 30,
            height: 30,
            lineHeight: 25,
            borderRadius: 15,
            borderColor: textColor,
            borderWidth: 1,
            textAlign: 'center',
            marginTop: 5,
            fontSize: 18,
            fontWeight: 'bold',
        };
        return (
            <View>
                <Text style={style}>{number}</Text>
            </View>
        );
    }
}

module.exports = AskTopList;
