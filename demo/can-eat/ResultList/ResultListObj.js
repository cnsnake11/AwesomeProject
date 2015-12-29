
'use strict'

import React, {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import {
    BaseLogicObj,
} from '../../../bbt-react-native';

class ResultListObj extends BaseLogicObj {

    getUrl(curPage) {
        const url = `http://www.babytree.com/api/mobile_toolcms/can_eat_list?` +
            `atype=ajax&pg=${curPage}&cat_id=${this.getProps().id}`;

        return url;
    }

    getData(res) {
        return res.data;
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity
                style={{
                    marginTop: 10,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'fff',
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

                                const img1 = require('./img/1.png');
                                const img2 = require('./img/2.png');
                                const img3 = require('./img/3.png');
                                let img = null;

                                if (one.status === '1') {
                                    img = img1;
                                } else if (one.status === '2') {
                                    img = img2;
                                } else if (one.status === '3') {
                                    img = img3;
                                }


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
                                            source={img} />
                                        <Text style={{fontSize:12,}}>{one.name}</Text>
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
                </View>

            </TouchableOpacity>
        );
    }

}

module.exports=ResultListObj;