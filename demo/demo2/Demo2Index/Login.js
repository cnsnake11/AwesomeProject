
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


class Login extends Component {

    componentWillMount() {

    }


    render() {

        if (this.props.show !== true) {
            return null;
        }

        return (
            <View style={[{position: 'absolute', right: 30,
            alignItems: 'flex-end'}, this.props.style]}>

                <View style={{width: 270, backgroundColor: '#fff'}}>

                    <View style={{ width: 270, height: 110, textAlign: 'center',
                     padding: 30, paddingLeft: 40, paddingRight: 40, }}>
                        <Text style={{color: '#154E63', fontSize: 20, textAlign: 'center'}}>
                            欢迎您的光临.
                        </Text>
                    </View>

                    <Input style={{marginBottom: 5, }} placeholder='用户名'
                        source={require('./img/user.png')} />
                    <Input source={require('./img/key.png')} placeholder='密码' />

                </View>
                <View style={{height: 44, width: 280, backgroundColor: '#2E2929'}}>
                    <TouchableOpacity onPress={() => this.props.obj.toHome()}
                        style={{justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={{color: '#FEFEFE', fontSize: 14, }}>登 录</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );

    }

}


class Input extends Component {

    render() {
        return (
            <View style={[{backgroundColor: '#F3F3F3', alignItems: 'center', flexDirection: 'row',
            padding: 10, }, this.props.style]}>
                <Image source={this.props.source}
                       style={{width: 16, height: 18, resizeMode: 'stretch', marginLeft: 10, marginRight: 10, }}/>
                <TextInput {...this.props} style={{height: 30, flex: 1, padding: 0,
                borderWidth: 0, backgroundColor: 'transparent'}} />
            </View>
        );
    }

}


module.exports = Login;
