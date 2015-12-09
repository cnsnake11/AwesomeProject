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
    }=React;

class DraggableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({x:100,y:100}), // inits to zero
        };
        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,


            //onPanResponderMove: Animated.event([null, {
            //    dx: this.state.pan.x, // x,y are Animated.Value
            //    dy: this.state.pan.y,
            //}]),


            onPanResponderMove:(evt,gestureState)=>{
                this.state.pan.setValue({x:gestureState.dx+100,y:gestureState.dy+100});
            },


            onPanResponderRelease: () => {
                Animated.spring(
                    this.state.pan,         // Auto-multiplexed
                    {toValue: {x: 100, y: 100},friction: 3, } // Back to zero
                ).start();
            },

            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return false;
            },
        });
    }
    render() {
        return (
            <View style={{backgroundColor:'white',flex:1,}}>
                <Animated.View
                    {...this.state.panResponder.panHandlers}
                    style={this.state.pan.getLayout()}>
                    <View style={{height:100,width:100,backgroundColor:'yellow'}}>
                        <Text>拖拽测试</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

module.exports=DraggableView;
