
'use strict';

import React, {
    Component,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Platform,
    Animated,
} from 'react-native';

import {
    BaseLogicObj,
} from '../../comm';

import SearchObj from './SearchObj';

class Search extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            searchText: this.props.keyWord || '',
            offset: new Animated.Value(0),
        };
        this.searchObj = new SearchObj(this);
        this._animating = false;
    }


    render() {

        return (

            <Animated.View style={[{backgroundColor: 'white', padding: 7, marginTop: this.state.offset,}, this.props.style]}>

                <View style={{borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 3, }} >
                   <TextInput enablesReturnKeyAutomatically={true}
                       style={{
                           height: 28,
                           backgroundColor: '#fff',
                           padding: 0,
                           paddingLeft: 35,
                           paddingRight: 28,
                       }}
                       clearButtonMode='always'
                       placeholder='输入食物，了解能不能吃'
                       value={this.state.searchText}
                       onChange={this.searchObj.changeText.bind(this.searchObj)}
                       onSubmitEditing={this.searchObj.search.bind(this.searchObj)}
                       />

                    <Image
                        style={{position: 'absolute',
                                top: -5,
                                left: 13,
                                width: 20,
                                resizeMode: 'contain',
                                backgroundColor: 'transparent', }}
                        source={require('./img/search.png')}
                        />

                    {
                        Platform.OS === 'android' && this.state.searchText ?
                            <TouchableOpacity
                                onPress={() => this.setState({searchText: '', })}
                                style={{
                                    position: 'absolute',
                                    top: 7,
                                    right: 3,
                                    height: 20,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    backgroundColor: 'transparent',
                                }}
                                >
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'stretch',
                                        backgroundColor: 'transparent', }}
                                    source={require('./img/del.png')}
                                    />
                            </TouchableOpacity>
                            :
                            null
                    }

                </View>
            </Animated.View>
        );

    }


    componentWillReceiveProps(props2) {

        if (this.props.show === props2.show) {
            return;
        }

        if (props2.show === false) {
            this._hide();
        } else {
            this._show();
        }
    }


    _show() {
        if (this._animating === true) {
            return;
        }

        this._animating = true;

        Animated.timing(
            this.state.offset,
            {toValue: 0, duration: 300, }
        ).start(() => this._animating = false);
    }

    _hide() {
        if (this._animating === true) {
            return;
        }

        this._animating = true;

        Animated.timing(
            this.state.offset,
            {toValue: -60, duration: 300, }
        ).start(() => this._animating = false);
    }

}

module.exports = Search;
