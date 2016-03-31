
'use strict';

import React from 'react-native';

import {
    BaseLogicObj,
} from '../../comm';

// import ResultList from '../ResultList/ResultList';

class SearchObj extends BaseLogicObj {
    changeText(e) {
        let text = e.nativeEvent.text;

        this.setState({
            searchText: text,
        });
    }

    search() {

        let text = this.getState().searchText;

        if (!text || !text.trim()) {
            return;
        }

        let nav = this.getProps().nav;
        let Result = this.getProps().resultComponent;

        nav.push({
            page: <Result title={`搜索:${text}`}
                              nav={nav}
                              keyWord={text} />,
        });
    }
}

module.exports = SearchObj;
