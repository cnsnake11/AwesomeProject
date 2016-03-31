
'use strict';

import React, {
    Component,
    View,
    InteractionManager,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';

import {
    BaseLogicObj,
    Loading,
} from '../../comm';

import Header from '../Header/Header';
import DetailObj from './DetailObj';
import Share from '../Share/Share';

class Detail extends Component {

    constructor() {
        super();
        this.state = {
            querying: true,
            initAnimateing: true,
            showShare: false,
        };
    }

    componentWillMount() {
        this.detailObj = new DetailObj(this);
        this.detailObj.query();
        InteractionManager.runAfterInteractions(() => {
            this.setState({initAnimateing: false, });
        });
    }


    render() {

        const {nav, title, } = this.props;
        const data = this.detailObj.data;
        const width = Dimensions.get('window').width;
        return (
                    this.state.querying === true || this.state.initAnimateing === true ?
                        <View style={{backgroundColor: '#efeff4', flex: 1, }}>
                            <Header title={title} nav={nav}/>
                            <Loading show={true} />
                        </View>
                        :

                        <View style={{backgroundColor: '#efeff4', flex: 1, }}>
                            <Header title={title}
                                    nav={nav}
                                    rightBtn='分享'
                                    rightBtnPress={this.detailObj.showShareRNM.bind(this.detailObj)} />

                            <ScrollView>
                                <AnimateView index={1} fromUp={true}>
                                <Image
                                    style={{
                                        width,
                                        height: 260,
                                        backgroundColor: '#fff',
                                    }}
                                    source={{uri: data.img, }}>
                                </Image>
                                </AnimateView>
                                {
                                    data.canEatList.map((one, i) => {
                                        return (
                                            <AnimateView index={i + 2}>
                                            <View
                                                key={i}
                                                style={{
                                                    backgroundColor: '#fff',
                                                    padding: 10,
                                                    marginBottom: 10,
                                                }}
                                                >

                                                <Text
                                                    style={{
                                                        color: '#ff537b',
                                                        fontWeight: '700',
                                                    }}>
                                                    {one.title}
                                                </Text>
                                                <View
                                                    style={{
                                                        marginTop: 5,
                                                        marginBottom: 5,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Image
                                                        style={{
                                                            width: 15,
                                                            height: 15,
                                                            resizeMode: 'contain',
                                                        }}
                                                        source={one.icon} />
                                                    <Text
                                                        style={{
                                                            color: '#666',
                                                        }}>
                                                        {one.status}
                                                    </Text>
                                                </View>

                                                <Text
                                                    style={{
                                                        color: '#666',
                                                    }}>
                                                    {one.des}
                                                </Text>
                                            </View>
                                            </AnimateView>
                                        );
                                    })
                                }

                                {
                                    data.adImg ?
                                        <TouchableOpacity
                                            onPress={this.detailObj.openAd.bind(this.detailObj)}
                                            style={{
                                                marginBottom: 10,
                                            }}>
                                            <Image
                                                style={{
                                                    width,
                                                    height: 100,
                                                    resizeMode: 'stretch',
                                                }}
                                                source={{
                                                    uri: data.adImg,
                                                }}/>
                                        </TouchableOpacity>
                                        :
                                        null
                                }


                                {
                                    data.tips ?
                                        <View
                                            style={{
                                                backgroundColor: '#fff',
                                                marginBottom: 10,
                                            }}>
                                            <Image
                                                source={require('./img/tips.png')}
                                                style={{
                                                    height: 40,
                                                    width: 120,
                                                    resizeMode: 'stretch',
                                                    justifyContent: 'center',
                                                    paddingLeft: 20,
                                                }}>
                                                <Text
                                                    style={{
                                                        color: '#fff',
                                                        fontWeight: '700',
                                                        backgroundColor: 'transparent',
                                                    }}>
                                                    小贴士
                                                </Text>
                                            </Image>
                                            <View
                                                style={{
                                                    margin: 10,
                                                }}>
                                                <Text>
                                                    {data.tips}
                                                </Text>
                                            </View>

                                        </View>
                                        :
                                        null
                                }


                            </ScrollView>
                        </View>
        );

    }


}


class AnimateView extends Component {

    componentWillMount() {
        this.win = Dimensions.get('window');
        this.state = {
            offset: new Animated.Value(this.win.height),
        };
    }

    render() {

        // index 要求从1开始
        let index = this.props.index / 1;

        if (this.fired !== true) {
            this.fired = true;
            Animated.timing(
                this.state.offset,
                {toValue: 0, duration: 300, delay: (index * 160)}
            ).start();
        }

        return (
            <Animated.View style={[{position: 'relative', },
            this.props.fromUp === true ? {bottom: this.state.offset} : {top: this.state.offset}]}>
                {this.props.children}
            </Animated.View>
        );
    }

}

module.exports = Detail;
