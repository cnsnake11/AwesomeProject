
'use strict'

import React, {
    Component,
    View,
 } from 'react-native';

import {
    ListViewBindUrl,
} from '../../../bbt-react-native';

//import Search from '../Search/Search';
import Header from '../Header/Header';
import ResultListObj from './ResultListObj';

class ResultList extends Component {

    componentWillMount() {
        this.resultListObj = new ResultListObj(this);
    }


    render() {

        const {nav, title, } = this.props;


        return (

            <View style={{backgroundColor: 'efeff4', flex: 1,}}>

                <Header title={title} nav={nav} />


                <ListViewBindUrl
                    getUrl={this.resultListObj.getUrl.bind(this.resultListObj)}
                    getData={this.resultListObj.getData.bind(this.resultListObj)}
                    renderRow={this.resultListObj.renderRow.bind(this.resultListObj)}
                    />

            </View>
        );

    }


}

module.exports = ResultList;


