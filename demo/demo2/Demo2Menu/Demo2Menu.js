
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

import Demo2MenuObj from './Demo2MenuObj';
import CloseBtn from '../Demo2CloseBtn/Demo2CloseBtn';

let winW = Dimensions.get('window').width;
let winH = Dimensions.get('window').height;

let offset = 0;
if (Platform.OS === 'android') {
    offset = 20;
}

let img1 = require('./img/1.png');
let img2 = require('./img/2.png');
let img3 = require('./img/3.png');
let img4 = require('./img/4.png');
let img5 = require('./img/5.png');
let img6 = require('./img/6.png');

class Demo2Menu extends Component {

    componentWillMount() {
        this.obj = new Demo2MenuObj(this);
    }

    render() {

        let nav = this.props.nav;

        return (
            <View style={{flex: 1, }}>

                <Title obj={this.obj} />

                <Menu obj={this.obj} />

                <CloseBtn theme='white' nav={nav}/>

            </View>
        );

    }

}

class Title extends Component {
    render() {
        return (
            <View style={{height: winH / 2 - 50, alignItems: 'center', justifyContent: 'center', padding: 30, }} >
                <Text style={{color: '#fff', fontSize: 20, }} >
                    You’re logged as David.
                    <Text style={{fontSize: 16, }} >Nice name. Really.</Text>
                </Text>
            </View>
        );
    }
}

class Menu extends Component {
    render() {
        return (
            <View style={{position: 'absolute', right: 15, bottom: 15 + offset,
            alignItems: 'flex-end', justifyContent: 'flex-end'}} >
                <MenuBtn title='HOME' img={img1} style={{width: 100}}/>
                <MenuBtn title='ABOUT' img={img2} style={{width: 100}}/>
                <MenuBtn title='MY ACCOUNT' img={img3} style={{width: 150}}/>
                <MenuBtn title='THE FEED' img={img4} style={{width: 110}}/>
                <MenuBtn title='MESSAGES' img={img5} style={{width: 160}}/>
                <MenuBtn title='LOGOUT' img={img6} style={{width: 170}}/>
            </View>
        );
    }
}

class MenuBtn extends Component {
    render() {
        return (
            <Image source={this.props.img}
                   style={[this.props.style, {height: 50, resizeMode: 'stretch'}]}>
            <TouchableOpacity style={{padding: 15, paddingRight: 25, }} >
                <Text style={{color: '#fff', textAlign: 'right', fontSize: 14, }} >
                    {this.props.title}</Text>
            </TouchableOpacity>
            </Image>
        );
    }
}

module.exports = Demo2Menu;
