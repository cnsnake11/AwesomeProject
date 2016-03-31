'use strict'


var React=require('react-native');
var {
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
    Animated,
    PanResponder,
    Dimensions,
    }=React;


class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }
    render() {
        return (
            <Animated.View                         // Base: Image, Text, View
                style={{
               width:Dimensions.get('window').width,
               height:Dimensions.get('window').height,
               backgroundColor:'green',
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
                />
        );
    }
    componentDidMount() {
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue,
            {
                toValue: 0.8,
                friction: 0.8,
            }
        ).start();
    }
}

module.exports=Playground;