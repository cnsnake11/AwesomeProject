
'use strict';


let React = require('react-native');

let {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    PanResponder,
    LayoutAnimation,
    InteractionManager,
    } = React;

class Checkbox extends Component {

    static propTypes = {
        /**
         * 最外层的style
         */
        style: React.PropTypes.any,

        /**
         * 图片的style
         */
        imgStyle: React.PropTypes.any,

        /**
         * 选中为true，不选中为false，默认为true
         */
        value: React.PropTypes.bool,

        /**
         * 点击触发的事件，入参为点击之后产生的新value
         */
        onPress: React.PropTypes.func,
    };

    static defaultProps = {
        value: true,
    };

    render() {

        let {value, style, imgStyle, onPress, } = this.props;

        return (
            <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#45ccd0', borderRadius: 20 , width: 25, height: 25},
                    style,
                    value === false ? {backgroundColor:'#ddd'} : null]}
                onPress={()=>{
                    if(!onPress)return;
                    onPress(!this.props.value)
                }}
                activeOpacity={1}
                >
                <Image style={[{width: 23, height: 23},
                imgStyle]}
                    source={require('./img/check.png')}/>
            </TouchableOpacity>
        );
    }

}


module.exports = Checkbox;












