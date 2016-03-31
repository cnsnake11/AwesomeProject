
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

class ImagePreview extends Component {

    static propTypes = {
        /**
         * 最外层的style
         */
        style: React.PropTypes.any,

        /**
         * 图片
         */
        image: React.PropTypes.any,

        /**
         * 导航器对象
         */
        nav: React.PropTypes.any,


        /**
         * 删除按钮点击事件,如果不定义，将不显示删除按钮
         */
        onDelBtnPress: React.PropTypes.func,

    };


    render() {

        let {image, style, nav, onDelBtnPress, } = this.props;
        let winW = Dimensions.get('window').width;
        let winH = Dimensions.get('window').height;

        return (
            <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#000', width: winW, height: winH},
                    style]}
                onPress={()=>{
                    nav.pop();
                }}
                activeOpacity={1}
                >
                {image}

                {
                    onDelBtnPress ?
                        <TouchableOpacity onPress={onDelBtnPress}
                            style={{backgroundColor: '#666', opacity: '0.6',
                            position: 'absolute', bottom: 40, right: 20,
                            padding: 5, borderWidth: 1, borderColor: '#fff'}}>
                            <Text style={{color: '#fff'}}>
                                删除
                            </Text>
                        </TouchableOpacity>
                        :
                        null
                }

            </TouchableOpacity>
        );
    }

}


module.exports = ImagePreview;












