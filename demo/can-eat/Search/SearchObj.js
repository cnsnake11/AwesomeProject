
'use strict';

import React from 'react-native';

import {
    BaseLogicObj,
} from '../../../bbt-react-native';

import ResultList from '../ResultList/ResultList';

class SearchObj extends BaseLogicObj {
    changeText(e) {
        const text = e.nativeEvent.text;

        this.setState({
            searchText: text,
        });
    }

    search() {
        const nav = this.getProps().nav;
        nav.push({
            page: <ResultList title={`搜索:${this.getState().searchText}`}
                              nav={nav}
                              keyWord={this.getState().searchText} />,
        });
    }
}

module.exports = SearchObj;


