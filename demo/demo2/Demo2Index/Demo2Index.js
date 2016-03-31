
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';

import Main from './Main';
import Login from './Login';
import SignIn from './SignIn';
import Demo2IndexObj from './Demo2IndexObj';

import {
    Mask,
    Navigator,
} from '../../../bbt-react-native';

let winW = Dimensions.get('window').width;
let winH = Dimensions.get('window').height;

class Demo2Index extends Component {

    componentWillMount() {

        this.state = {
            showLogin: false,
            showSignIn: false,

            showSplash: true,
        };

        this.obj = new Demo2IndexObj(this);
    }

    render() {

        return (
            <Image
                style={{width: winW, height: winH, position: 'absolute', _resizeMode: 'contain'}}
                source={require('./img/bg.png')}>
                <Navigator nav={this.props.nav}
                           ref='nav'
                           initialRoute={{
                               page: () => this._render(),
                               name: 'splash',
                               onHardwareBackPress: () => this.obj.onHardwareBackPress(),
                           }}/>
            </Image>
        );

    }

    _render() {

        return (
            <View style={{flex: 1}}>
                {
                    this.state.showSplash === true ?
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: "#fff", fontSize: 14, }}>请稍候....精彩即将开始</Text>
                        </View>
                        :
                        this._render2()
                }
            </View>
        );


    }

    _render2() {

        let offset = 0;
        if (Platform.OS === 'android') {
            offset = 20;
        }

        return (
            <View style={{flex: 1}}>
                <Main obj={this.obj}/>


                <Mask onPress={() => {
                    this.obj.hideLogin();
                    this.obj.hideSignIn();
                }}
                    style={{opacity: 0}}
                    show={this.state.showLogin || this.state.showSignIn} />

                <Login obj={this.obj} show={this.state.showLogin} style={{bottom: 30 + offset + 44}}/>
                <SignIn obj={this.obj} show={this.state.showSignIn} style={{bottom: 30 + offset}}/>
            </View>
        );

    }

}


module.exports = Demo2Index;
