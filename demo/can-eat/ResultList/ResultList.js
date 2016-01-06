
'use strict';

import React, {
    Component,
    View,
    Text,
    TouchableOpacity,
    InteractionManager,
 } from 'react-native';

import {
    ListViewBindUrl,
    Loading,
} from '../../../bbt-react-native';

// import Search from '../Search/Search';
import Header from '../Header/Header';
import ResultListObj from './ResultListObj';
import Detail from '../Detail/Detail';

class ResultList extends Component {

    constructor() {
        super();
        this.state = {
            noDataAtAll: false, // 干脆没有结果
            onlyOneData: false, // 唯一结果
            haveListData: true, // 有list结果


            initAnimating: true, // 转场动画进行中
            initFetching: true, // 初始化请求进行中

        };
    }

    componentWillMount() {
        this.resultListObj = new ResultListObj(this);
        this.resultListObj.init();
        InteractionManager.runAfterInteractions(() => this.setState({initAnimating: false, }));
    }


    render() {

        const {nav, title, } = this.props;

        return (
            this.state.initFetching === true || this.state.initAnimating === true ?
                <View style={{flex: 1, backgroundColor: 'efeff4', }}>
                    <Header title={title} nav={nav} />
                    <Loading show={true} />
                </View>
                :
                this._tpl()
        );

    }


    _tpl() {

        const {nav, title, } = this.props;

        return (
            this.state.onlyOneData === true ?
                <Detail
                    htmlStr={this.resultListObj.detailStr}
                    nav={this.props.nav}
                    title={this.props.keyWord} />
                :
                <View style={{backgroundColor: 'efeff4', flex: 1, }}>

                    <Header title={title} nav={nav} />

                    {
                        this.state.haveListData === true ?
                            <ListViewBindUrl
                                getUrl={this.resultListObj.getUrl.bind(this.resultListObj)}
                                getData={this.resultListObj.getData.bind(this.resultListObj)}
                                renderRow={this.resultListObj.renderRow.bind(this.resultListObj)}

                                initData={this.resultListObj.data}

                                />
                            :
                            null

                    }

                    {
                        this.state.noDataAtAll === true ?
                            <NoData keyWord={this.props.keyWord} />
                            :
                            null
                    }

                </View>

        );
    }

}

class NoData extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'center',
                }}
                >
                <Text
                    style={{
                        color: '#535353',
                    }}
                    >
                    没有找到"{this.props.keyWord}"的相关结果,要不要去孕育问答询问下其它宝妈?
                </Text>
                <TouchableOpacity
                    style={{
                        marginTop: 40,
                    }}
                    >
                    <View
                        style={{
                            backgroundColor: '#ff537b',
                            width: 80,
                            padding: 10,
                        }}
                        >
                        <Text
                            style={{
                                color: 'fff',
                                fontWeight: '700',
                                textAlign: 'center',
                            }}
                            >
                            去提问
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

module.exports = ResultList;
