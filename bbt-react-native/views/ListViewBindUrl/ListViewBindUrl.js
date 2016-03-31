
'use strict';

let React = require('react-native');
let css = require('./ListViewBindUrl.css');
let Loading = require('../Loading/Loading');
let bbtFetch = require('../../api/bbtFetch/bbtFetch');
let FetchError = require('../FetchError/FetchError');
let Row = require('./ListViewBindUrlRow');

// let propsCheck=require('../../base/PropsCheck/PropsCheck');
// let propsConcat=require('../../base/PropsConcat/PropsConcat');


let {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    LayoutAnimation,
    InteractionManager,
    ListView,
    PropTypes,
    RefreshControl,
    } = React;

/**
 * 绑定服务器分页服务的listview
 * 滚动到底部会自动访问服务器服务
 */
let ListViewBindUrl = React.createClass({


    propTypes: {

        // 还支持listview的所有属性
        // ...ListView.propTypes,//没加上这句的原因是：加这个会提示一些错误,比如datasoure为定义等等


        /**
         * (curpage) => string
         * 根据传入的当前页curpage：
         * 1. 可以返回一个url，此url是提供分页数据的url。
         * 2. 或者返回一个promise (url) => {},以url为入参。
         */
        getUrl: PropTypes.func.isRequired,


        /**
         * (res) => array
         * 根据传入的fetch返回数据res，返回listview要用的数据，类型是数组。
         */
        getData: PropTypes.func.isRequired,


        /**
         * (rowdata) => renderable
         * 根据传入的行数据rowdata，返回一个jsx，用做listview的一行。
         * 此属性与listview的renderRow是一致的。
         */
        renderRow: PropTypes.func.isRequired,


        /**
         * (ListViewBindUrl) => renderable
         * 渲染listview底部，传入参数为当前的ListViewBindUrl对象
         */
        renderFooter: PropTypes.func,


        /**
         * 初始化数据，如果提供此数组，组件初始化不会发请求，直接使用此数据作为第一次的初始化操作
         */
        initData: PropTypes.array,

        /**
         * 行数据的主键key，可以标识这一行，用来做精确行比较以提升性能，非必填，但是建议设置。默认为null。
         */
        rowDataKey: PropTypes.string,


        /**
         * 数据总数，可以为null，如果设置此值，会根据此值进行是否还有数据的判断，可以少发一次请求
         */
        totalRows: PropTypes.number,


        /**
         * 是否显示返回顶部的按钮。默认为false。
         */
        topBtn: PropTypes.bool,

        /**
         * 是否使用下拉刷新功能。默认为false。
         */
        pullDownRefresh: PropTypes.bool,

        /**
         * 浏览到底部后，没有数据时候显示的信息.默认值为'没有数据了...'
         */
        noDataMsg: PropTypes.string,

        /**
         * 是否使用动画效果来创建行
         */
        animateRow: PropTypes.bool,

        /**
         * 使用动画效果创建行的行数
         */
        animateRowMaxRowNum: PropTypes.number,

    },


    getDefaultProps() {
        return {
            topBtn: false,
            pullDownRefresh: false,
            noDataMsg: '没有数据了...',
            animateRow: false,
            animateRowMaxRowNum: 5,
        };
    },

    /**
     * 当前所处页数
     */
    curPage: 0,

    /**
     * 已经请求过的所有数据
     */
    data: [],

    /**
     * 重置状态,切换数据源之前请执行他
     * @return {void}
     */
    clear() {
        this._threadId = Math.random();
        this.curPage = 0;
        this.data = [];

        // 修复安卓下，切换数据源，高度不变，导致endreached事件会触发很多次
        if (React.Platform.OS === 'android') {
            this.refs.list.getScrollResponder().scrollTo({y: 0});
        }

        let initState = this.getInitialState();
        initState._initAnimateing = false;
        this.setState(initState);
    },

    /**
     * 装载数据
     * @return {void}
     */
    load() {
        this._queryData();
    },

    /**
     * 重置状态 并 装载数据
     * @return {void}
     */
    reload() {
        this.clear();
        this.load();
    },

    /**
     * @param {object} rowdata 列表某一行的数据
     * 增量刷新列表中数据，此方法为实验性方法，不要大规模使用
     * @return {void}
     */
    refresh(rowdata) {

        rowdata.$$$$$updated = true;

        let ds = this.state.dataSource.cloneWithRows(this.data);
        this.setState({dataSource: ds});
    },

    /**
     * 是否还有更多的数据
     * @return {boolean} true还有数据 ， false已经没有数据了
     */
    isMoreData() {
        return !this.state._noData;
    },

    // 线程id，控制多个请求发出的时候[切换数据源的时候是可以发出多个请求的]，只有正确的请求可以去更新view
    _threadId: 'init',


    getInitialState() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {

                if (r2.$$$$$updated === true) {
                    delete r2.$$$$$updated;
                    return true;
                }

                if (this.props.rowDataKey) {
                    let key = this.props.rowDataKey;
                    return r1[key] !== r2[key];
                }

                return r1 !== r2;
            }
        });
        return {
            dataSource: ds.cloneWithRows([]),

            // noDataText:'没有数据了..',

            _loading: false, // 是否进行滚动到底部的加载
            _noData: false, // 是否没有数据了


            _initLoading: true, // 是否初始化加载
            _initAnimateing: true, // 是否转场动画中

            _isRefreshing: false, // 是否进行下拉刷新中


            _topBtnBottom: new Animated.Value(-32),

            _fetchError: false,
        };
    },


    componentWillMount() {

        this._renderFooter_userDefine = this.props.renderFooter;

        InteractionManager.runAfterInteractions(() => {
            this.setState({_initAnimateing: false});
        });

        if (this.props.initData) {

            console.log('初始化使用initData装载数据.');

            // this.data=this.data.concat(this.props.initData);
            this._queryData(this.props.initData);

        } else {
            console.log('初始化请求服务器来装载数据');
            this._queryData();
        }

    },

    render() {

        // console.log('render');

        if (this.state._initLoading === true && this.state._fetchError === true) {
            return (
                <FetchError onRetry={() => this._queryData()}/>
            );
        }


        let jsx = (
            this.state._initLoading === true || this.state._initAnimateing === true ?
            <Loading show={true} />
            :
            <View style={{flex: 1, }}>
                <ListView ref='list'
                          onEndReachedThreshold={100}
                          pageSize={10}
                          keyboardShouldPersistTaps={true}
                          keyboardDismissMode='on-drag'
                          showsVerticalScrollIndicator={true}

                          {...this.props}

                          renderRow={this._renderRow}
                          dataSource={this.state.dataSource}
                          onEndReached={this._endReached }
                          renderFooter={this._renderFooter}

                          refreshControl={
                            this.props.pullDownRefresh === true ?
                              <RefreshControl
                                refreshing={this.state._isRefreshing}
                                onRefresh={this._onRefresh}
                                tintColor='#999'
                                title=''
                                _colors={['#999']}
                                progressBackgroundColor='#fff'
                              />
                              :
                              null
                           }

                          onScroll={this._onScroll}
                          onScrollEndDrag={this._onScrollEndDrag}
                    />

                {this.props.topBtn === true ?
                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: this.state._topBtnBottom,
                        right: 10,
                        backgroundColor: 'rgba(0,0,0,.55)',
                        width: 32,
                        height: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 18,
                    }}
                        onPress={(e) => {
                            this.refs.list.scrollTo({y: 0});
                            this._hideTopBtn(e);
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: 'bold',
                        }}>
                            ↑
                        </Text>
                    </TouchableOpacity>
                :
                null}
            </View>

        );

        // return propsConcat.concat(this,jsx);
        return jsx;

    },


    _renderRow(data, sectionId, rowNum) {

        // console.log(rowNum);


        if (this.props.animateRow !== true) {
            return this.props.renderRow(...arguments);
        }


        let maxRowNum = this.props.animateRowMaxRowNum;

        if (rowNum <= maxRowNum) {
            return (
                <Row rowNum={rowNum} animateRowMaxRowNum={this.props.animateRowMaxRowNum}>
                    {this.props.renderRow(...arguments)}
                </Row>
            );
        }

        return this.props.renderRow(...arguments);

    },


    _lastUpOrDown: null,
    _onScrollEndDrag(e) {
        if (this.props.onScrollEndDrag) {
            this.props.onScrollEndDrag(e);
        }


        if (this._lastUpOrDown === 'up') {
            if (this.props.onScrollUpDragEnd) {
                this.props.onScrollUpDragEnd(e);
            }

            this._showTopBtn(e);

        } else if (this._lastUpOrDown === 'down') {
            if (this.props.onScrollDownDragEnd) {
                this.props.onScrollDownDragEnd(e);
            }

            this._hideTopBtn(e);
        }

        this._lastUpOrDown = null;
    },

    // 上一次滚动的y轴距离，用于计算向上or向下滚动
    _lastScrollY: 0,

    _onScroll(e) {

        if (this.props.onScroll) {
            this.props.onScroll(e);
        }

        if (!this.props.onDowning && !this.props.onUping && this.props.topBtn !== true
            && !this.props.onScrollDownDragEnd && !this.props.onScrollUpDragEnd) {
            return;
        }


        let offset = e.nativeEvent.contentOffset.y;
        if (offset < 0) {
            return;
        }

        if (offset - this._startScrollY > 0) {

            if (this.props.onDowning) {
                this.props.onDowning(e);
            }

            this._lastUpOrDown = 'down';

        } else if (this._startScrollY - offset > 0) {

            if (this.props.onUping) {
                this.props.onUping(e);
            }

            this._lastUpOrDown = 'up';

        }

        this._startScrollY = offset;
    },

    _topBtnIsShow: false,
    _animating: false,

    _showTopBtn(e) {

        if (this.props.topBtn !== true) {
            return;
        }

        let offset = e.nativeEvent.contentOffset.y;

        if (offset < Dimensions.get('window').height / 2) {
            this._hideTopBtn(e);
            return;
        }


        if (this._topBtnIsShow === true) {
            return;
        }

        if (this._animating === true) {
            return;
        }

        this._animating = true;
        this._topBtnIsShow = true;


        Animated.timing(
            this.state._topBtnBottom,
            {toValue: 10, duration: 300, }
        ).start(() => this._animating = false);
    },

    _hideTopBtn() {

        if (this.props.topBtn !== true) {
            return;
        }

        if (this._topBtnIsShow === false) {
            return;
        }

        if (this._animating === true) {
            return;
        }

        this._animating = true;
        this._topBtnIsShow = false;

        Animated.timing(
            this.state._topBtnBottom,
            {toValue: -32, duration: 300, }
        ).start(() => this._animating = false);

    },


    _onRefresh() {
        this.setState({_isRefreshing: true, _noData: false, _loading: true, });
        this._threadId = Math.random();
        this.curPage = 0;
        this._queryData();
    },

    _fetchErrorTpl() {
        return (
            <View style={[css.footerLoadingView, {
                flexDirection: 'row',
            }]}>
                <TouchableOpacity onPress={() => {
                    this._queryData();
                }}>
                    <Text style={{textDecorationLine: 'underline'}}>网络不给力，点我重试</Text>
                </TouchableOpacity>
            </View>
        );
    },

    _renderFooter() {

        // console.log('_renderFooter');

        if (this._renderFooter_userDefine) {

            return (
                <View>
                    {this._renderFooter2()}
                    {this._renderFooter_userDefine(this)}
                </View>
            );

        }

        return this._renderFooter2();

    },


    _renderFooter2() {

        if (this.state._fetchError === true) {
            return this._fetchErrorTpl();
        }

        if (this.state._noData === true) {

            if (!this.props.noDataMsg) {
                return null;
            }


            return (
                <View style={css.footerLoadingView}>
                    <Text> {this.props.noDataMsg} </Text>
                </View>
            );
        }

        if (this.state._loading === true && this.state._isRefreshing === false) {
            return (
                <Loading style={css.footerLoadingView} show={true} />
            );
        }

        return <View style={css.footerLoadingView} />;

    },

    _endReached() {
        this._queryData();
    },


    /**
     * 查询并装载数据or直接装载数据
     * @param {object} data 要直接装载的首页数据，可以不传，不传就直接发请求加载首页数据
     * @return {void}
     */
    _queryData(data) {

        let _threadId = this._threadId;
        let isRef = this.state._isRefreshing;// 是否执行下拉刷新

        if (this.state._loading === true && isRef === false) {
            console.log('尚有查询请求未完成，不能执行新的请求.');
            return;
        }

        if (this.state._noData === true && isRef === false) {
            console.log('服务器已经没有数据了，不能执行新的请求.');
            return;
        }

        this.setState({_loading: true, _fetchError: false});

        if (data) {

            this._loadData(data, _threadId);

            if (this._threadId !== _threadId) {

                // console.log('threadId不一致，终止这次view更新.');
                return;
            }

            // this.setState({_loading: false, _initLoading: false});


        } else {

            let props = this.props;
            let getUrl = props.getUrl;

            let url = getUrl(this.curPage);
            if (!url) {
                console.error('返回的url为空。');
                return;
            }

            let next;

            if (typeof url !== 'string') {// todo 此处应该精确判断返回为promise

                next = url.then((urlStr) => {
                    if (!urlStr) {
                        console.error('返回的url为空。');
                    }
                    return this._fetch(urlStr);
                });

            } else {// 返回的是字符串

                next = this._fetch(url);

            }

            next.then((res) => {
                return res.json();
            }).then((res) => {

                console.log('请求成功.');
                let getData = this.props.getData;
                data = getData(res, this.curPage);
                this._loadData(data, _threadId);

            }).
            catch((error) => {
                if (this._threadId !== _threadId) {
                    return;
                }
                this.setState({_fetchError: true, _loading: false});
            }).
            done((res) => {

                if (this._threadId !== _threadId) {

                    // console.log('threadId不一致，终止这次view更新.');
                    return;
                }

                // this.setState({_loading: false, _initLoading: false, _isRefreshing: false, });
            });

        }

    },


    _fetch(url, cfg) {

        if (this._fetchImp) {// 如果有实现
            return this._fetchImp(url, cfg);
        }

        return bbtFetch(url, cfg);
    },

    // 装载数据
    _loadData(data, _threadId) {

        if (this._threadId !== _threadId) {
            console.log('threadId不一致，终止这次view更新.');
            return;
        }

        let newState = {_loading: false, _initLoading: false, _isRefreshing: false, };

        if (!data || data.length === undefined || data.length === 0) {
            newState._noData = true;
            console.log('根据返回结果判断，服务器已经没有数据了.');
        } else {

            // this.data = this.data.concat(data);

            if (this.state._isRefreshing === true) {
                this.data = data;
            } else {
                this.data = this.data.concat(data);
            }

            let ds = this.state.dataSource.cloneWithRows(this.data);
            this.curPage = this.curPage + 1;
            newState.dataSource = ds;
        }


        if (this.props.totalRows / 1 >= 0 && this.props.totalRows / 1 === this.data.length) {
            // 精确的根据数据总数判断是否已经没有数据了，可以少发一次请求
            console.log('根据totalRows判断，服务器已经没有数据了.');
            newState._noData = true;
        }
        this.setState(newState);

        console.log('更新view成功.');

    },

});

module.exports = ListViewBindUrl;
