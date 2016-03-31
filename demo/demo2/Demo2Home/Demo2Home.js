
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
    Animated,
} from 'react-native';

import Demo2Card from '../Demo2Card/Demo2Card';
import Demo2HomeObj from './Demo2HomeObj';

class Demo2Home extends Component {

    componentWillMount() {
        this.obj = new Demo2HomeObj(this);

        this.state = {
            offset: 0,
        };
    }

    render() {

        let nav = this.props.nav;

        return (
            <View style={{flex: 1, }}>

                <ScrollView horizontal={true}
                            scrollEventThrottle={50}
                            onScroll={(e) => this.obj.onScroll(e)}
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Demo2Card nav={nav} offset={this.state.offset} index={0}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={1}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={2}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={3}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={4}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={5}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={6}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={7}/>
                    <Demo2Card nav={nav} offset={this.state.offset} index={8}/>
                </ScrollView>

                <MenuBtn obj={this.obj}/>
            </View>
        );

    }

}

class MenuBtn extends Component {

    render() {

        let offset = 0;
        if (Platform.OS === 'android') {
            offset = 20;
        }

        return (
            <TouchableOpacity onPress={() => this.props.obj.toMenu()}
                style={{padding: 20, position: 'absolute', left: 10, bottom: 10 + offset, }} >
                <Image source={require('./img/menu.png')}
                       style={{width: 18, height: 15, resizeMode: 'stretch'}} />
            </TouchableOpacity>
        );
    }
}


module.exports = Demo2Home;
