
'use strict';

import React from 'react-native';

import {
    BaseLogicObj,
} from '../../../bbt-react-native';

// import ResultList from '../ResultList/ResultList';

class SearchObj extends BaseLogicObj {
    changeText(e) {
        let text = e.nativeEvent.text;

        this.setState({
            searchText: text,
        });
    }

    search() {
        let nav = this.getProps().nav;
        let Result = this.getProps().resultComponent;

        nav.push({
            page: <Result title={`搜索:${this.getState().searchText}`}
                              nav={nav}
                              keyWord={this.getState().searchText} />,
        });
    }
}

module.exports = SearchObj;
