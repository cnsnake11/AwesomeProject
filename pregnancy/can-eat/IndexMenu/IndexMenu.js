
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
    ListView,
    StatusBarIOS,
    TextInput,
    Image,
    Dimensions,
    ScrollView,
    Animated,
} from 'react-native';

import {
    ListViewBindUrl,
    Loading,
    BaseLogicObj,
} from '../../comm';

import ResultList from '../ResultList/ResultList';

// 静态数据
const _data = [
    {
        title: '主食',
        img: require('./img/zhushi.jpg'),
        id: '28',
    },
    {
        title: '蔬菜菌类',
        img: require('./img/shucai.jpg'),
        id: '29',
    },
    {
        title: '水果',
        img: require('./img/shuiguo.jpg'),
        id: '30',
    },
    {
        title: '零食小吃',
        img: require('./img/lingshi.jpg'),
        id: '31',
    },
    {
        title: '肉/蛋类',
        img: require('./img/rou.jpg'),
        id: '32',
    },
    {
        title: '饮品',
        img: require('./img/yinpin.jpg'),
        id: '33',
    },
    {
        title: '豆/奶制品',
        img: require('./img/dou.jpg'),
        id: '44',
    },
    {
        title: '加工食品',
        img: require('./img/jiagong.jpg'),
        id: '45',
    },
    {
        title: '水产品',
        img: require('./img/shui.jpg'),
        id: '46',
    },

    {
        title: '调味品',
        img: require('./img/tiaoweipin.jpg'),
        id: '47',
    },
    {
        title: '补品草药',
        img: require('./img/bupin.jpg'),
        id: '48',
    },
    {
        title: '坚果类',
        img: require('./img/jianguo.jpg'),
        id: '49',
    },

];

class IndexMenuObj extends BaseLogicObj {

    toResultList(id, title) {

        let nav = this.getProps().nav;


        nav.push(
            {
                page: (
                    <ResultList nav={nav} id={id} title={title}/>
                ),
            }
        );

    }
}

class IndexMenu extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentWillMount() {
        this.indexMenuObj = new IndexMenuObj(this);
    }


    render() {

        const data = _data;

        return (

            <ScrollView keyboardShouldPersistTaps={false}
                        scrollEnabled={true}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>

                {
                    data.map((one, index) => {

                        return <Button nav={this.props.nav} one={one} index={index} indexMenuObj={this.indexMenuObj}/>;

                    })
                }


            </View>
            </ScrollView>

        );

    }

}

class Button extends Component {

    componentWillMount() {
        this.state = {
            offset: new Animated.Value(-Dimensions.get('window').width),
        };

        this.props.nav.navigationContext.addListener('willfocus', (event) => {
            let name = event.data.route.name;
            if (name === 'home') {
                this.state.offset.setValue(-Dimensions.get('window').width);
                this._animate();
            }
        });

    }

    _animate() {
        Animated.timing(
            this.state.offset,
            {toValue: 0, duration: 300, delay: 450 + this.props.index * 40}
        ).start();
    }

    render() {

        let {index, one} = this.props;
        this.indexMenuObj = this.props.indexMenuObj;

        this._animate();

        return (
            <Animated.View
                key={index}
                style={{
                    width: Dimensions.get('window').width / 3,
                    alignItems: 'center',
                    position: 'relative',
                    left: this.state.offset,
                }}>
                <TouchableOpacity
                    onPress={this.indexMenuObj.toResultList.bind(this.indexMenuObj, one.id, one.title)}
                    style={{
                        width: 60,
                        marginTop: 25,
                    }}>

                    <View style={{width: 60, }}>

                        <Image
                            style={{
                                borderRadius: 30,
                                width: 60,
                                height: 60,
                            }}
                            source={one.img} />

                        <Text
                            style={{
                                textAlign: 'center',
                            }}>
                            {one.title}
                        </Text>

                    </View>

                </TouchableOpacity>
            </Animated.View>
        );
    }
}

module.exports = IndexMenu;
