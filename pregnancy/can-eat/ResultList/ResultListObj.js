
'use strict';

import React, {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import {
    BaseLogicObj,
    BBToolRNM,
    BBPageRouterRNM,
    bbtFetch,
    FetchErrorApi,
} from '../../comm';

import Header from '../Header/Header';
import Detail from '../Detail/Detail';

class ResultListObj extends BaseLogicObj {

    pressAsk() {
        BBToolRNM.currentHostName().then((res) => {
            BBPageRouterRNM.showPage({
                url: res.data + '/app/ask/',
            });
        });
    }

    init() {

        this.img1 = require('./img/1.png');
        this.img2 = require('./img/2.png');
        this.img3 = require('./img/3.png');

        let url = this.getUrl(0);

        bbtFetch(url).
            then((res) => {
                let str = res._bodyText;

                if (str && (str.indexOf('<!DOCTYPE html>') !== -1 || str.indexOf('{"_":""}') !== -1)) { // 不是列表数据

                    if (str.indexOf('{"_":""}') !== -1) {// 没有任何数据
                        this.setState({
                            noDataAtAll: true,
                            haveListData: false,
                        });
                    } else { // 查到唯一的一个结果

                        this.detailStr = str;

                        this.setState({
                            onlyOneData: true,
                            haveListData: false,
                        });
                    }
                    return false;
                }

                // 是列表数据
                return res.json();

            }).then((res) => {

                if (res === false) {
                    return;
                }
                this.data = res.data;

            }).catch((error) => {
                let {nav, title} = this.getProps();
                FetchErrorApi.showPage({
                    nav,
                    header: <Header nav={nav} title={title} />,
                });
            }).done(() => this.setState({initFetching: false}));

    }


    getUrl(curPage) {
        let url = null;

        let keyWord = this.getProps().keyWord;
        if (keyWord) {
            keyWord = encodeURI(keyWord);
            url = `/api/mobile_toolcms/can_eat_search?` +
                `atype=ajax&pg=${curPage + 1}&q=${keyWord}`;
        } else {
            url = `/api/mobile_toolcms/can_eat_list?` +
                `atype=ajax&pg=${curPage + 1}&cat_id=${this.getProps().id}`;
        }

        return url;
    }

    getData(res) {
        return res.data;
    }

    pressOne(data) {
        const nav = this.getProps().nav;
        nav.push({
            page: <Detail nav={nav} title={data.title} id={data.id} />
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                onPress={this.pressOne.bind(this, rowData)}
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    padding: 10,
                }}>

                    <Image
                        style={{
                            width: 80,
                            height: 80,
                        }}
                        source={{uri: rowData.thumbs, }}
                        />


                    <View
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#535353',
                                fontWeight: '700',
                            }}>
                            {rowData.title}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#727272',
                            }}>
                            {rowData.sub_title}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            {rowData.post_attr.map((one, i) => {
                                
                                return (
                                    <View key={i}
                                          style={{
                                              flexDirection: 'row',
                                              marginRight: 10,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                          }}>
                                        <Image
                                            style={{
                                                width: 15,
                                                resizeMode: 'contain',
                                            }}
                                            source={this['img' + one.status]} />
                                        <Text style={{fontSize: 12, }}>{one.name}</Text>
                                    </View>
                                );
                            })}
                        </View>

                    </View>

                    <View
                        style={{
                            width: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 80,
                        }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#999',
                                }}>
                                {'>'}
                            </Text>

                    </View>

            </TouchableOpacity>
        );
    }

}

module.exports = ResultListObj;
