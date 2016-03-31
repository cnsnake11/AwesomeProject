
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

import Demo2CardObj from './Demo2CardObj';

let winW = Dimensions.get('window').width;
let winH = Dimensions.get('window').height;


class Demo2Card extends Component {

    componentWillMount() {
        this.obj = new Demo2CardObj(this);
    }

    render() {

        let height = winH * 0.7;
        if (height < 350) {
            height = 350;
        }

        let width = winW * 0.8;


        let fixed = null;
        let {index, offset} = this.props;

        let allWidth = (width + 10 + 10) * index - this.props.index * 5;


        let ssss = null;
        if (this.props.flag === false) {
            ssss = {
                position: 'absolute',
                left: this.props.index * 5,
            };
        }
        if (this.props.flag !== false && offset >= allWidth ||
            this.props.flag === false && offset < allWidth) {
            return <View style={[{width, height, backgroundColor: 'transparent', shadowColor: '#000',
            shadowOffset: {width: 5, height: 5}, shadowOpacity: 0.2, shadowRadius: 4,
            marginLeft: 10, marginRight: 10, }, this.props.style, ssss]} />;
        }


        //if (offset >= allWidth) {
        //    fixed = {
        //        position: 'relative',
        //        left: offset - allWidth,
        //    };
        //}

        return (

            <View style={[{width, height, backgroundColor: '#fff', shadowColor: '#000',
            shadowOffset: {width: 5, height: 5}, shadowOpacity: 0.2, shadowRadius: 4,
            marginLeft: 10, marginRight: 10, borderColor: '#666', borderWidth: 1 }, this.props.style, fixed, ssss]}>
                <TouchableOpacity onPress={() => this.obj.toDetail()}>
                <Image source={require('./img/card1.png')}
                    style={{backgroundColor: '#666', height: 180, width, }} />

                <View style={{padding: 20, paddingBottom: 5, }}>
                    <Text style={{fontSize: 20, color: '#133D50', }}>
                        I’m a title. A good one.{this.props.index}
                    </Text>
                </View>

                <View style={{padding: 20, paddingTop: -0, }}>
                    <Text style={{color: '#46485A', opacity: 0.6, lineHeight: 25, }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Dolores eos qui ratione voluptatem sequi nesciunt. Neque tempor porro quisquam consectetur est..
                    </Text>
                </View>
                </TouchableOpacity>
            </View>

        );

    }

}


module.exports = Demo2Card;
