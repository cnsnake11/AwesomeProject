
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
    BackAndroid,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
} from 'react-native';

let winW = Dimensions.get('window').width;
let winH = Dimensions.get('window').height;

let offset = 0;
if (Platform.OS === 'android') {
    offset = 20;
}

let blue = require('./img/close_blue.png');
let white = require('./img/close_white.png');

class CloseBtn extends Component {

    render() {

        let img = blue;

        if (this.props.theme === 'white') {
            img = white;
        }

        return (
            <TouchableOpacity onPress={() => this.props.nav.pop()}
                              style={{position: 'absolute', left: -18, bottom: -18 + offset, }} >
                <Image style={{width: 100, height: 100, resizeMode: 'stretch', }}
                       source={img} />
            </TouchableOpacity>
        );
    }
}

module.exports = CloseBtn;
