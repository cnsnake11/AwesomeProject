
'use strict'

import React, {
    Component,
    View,
    TextInput,
    Image,
} from 'react-native';

import {
    BaseLogicObj,
} from '../../../bbt-react-native';

import SearchObj from './SearchObj';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            searchText: '',
        };
    }

    componentWillMount() {
        this.searchObj = new SearchObj(this);
    }

    render(){

        return (

            <View style={{backgroundColor: 'white', padding: 10, }} >

               <TextInput
                   style={{
                       borderColor: '#ff537b',
                       borderWidth: 1,
                       height: 28,
                       borderRadius: 10,
                       backgroundColor: '#fff',
                       padding: 0,
                       paddingLeft: 35,
                   }}

                   placeholder='输入食物，了解能不能吃'
                   value={this.state.searchText}
                   onChange={this.searchObj.changeText.bind(this.searchObj)}
                   onSubmitEditing={this.searchObj.search.bind(this.searchObj)}
                   />

                <Image
                    style={{position:'absolute',
                            top:2,
                            left:20,
                            width:20,
                            resizeMode:'contain',
                            backgroundColor:'transparent',}}
                    source={require('./img/search.png')}
                    />

            </View>
        );

    }


}

module.exports = Search;


