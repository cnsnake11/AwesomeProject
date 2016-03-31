
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

import CloseBtn from '../Demo2CloseBtn/Demo2CloseBtn';

class Demo2Detail extends Component {

    componentWillMount() {

    }

    render() {

        let nav = this.props.nav;

        return (
            <View style={{flex: 1, }}>

                <Image source={require('./img/header.png')}
                    style={{position: 'absolute', top: 0, left: 0,
                width: winW, height: 300, backgroundColor: '#666'}}/>

                <ScrollView style={{flex: 1, }}>
                    <View style={{marginTop: 300, backgroundColor: '#fff', padding: 40, paddingBottom: 100, }}>
                        <Text style={{fontSize: 20, color: '#133D50', }}>
                            I’m a title. A good one.
                        </Text>
                        <View style={{height: 20, }}/>
                        <Text style={{color: '#46485A', opacity: 0.6, lineHeight: 25, }} >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Dolores eos qui ratione voluptatem sequi nesciunt. Neque tempor porro quisquam consectetur est. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Dolores eos qui ratione voluptatem sequi nesciunt. Neque tempor porro quisquam consectetur est. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Dolores eos qui ratione voluptatem sequi nesciunt. Neque tempor porro quisquam consectetur est. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Dolores eos qui ratione voluptatem sequi nesciunt. Neque tempor porro quisquam consectetur est. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum

                        </Text>
                    </View>
                </ScrollView>

                <CloseBtn theme='blue' nav={nav} />
            </View>
        );

    }

}

module.exports = Demo2Detail;
