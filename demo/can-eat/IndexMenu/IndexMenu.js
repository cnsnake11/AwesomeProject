
'use strict'


import React,{
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
    TextInput,
    Image,
    Dimensions,
} from 'react-native';

import {
    ListViewBindUrl,
    Loading,
    BaseLogicObj,
} from '../../../bbt-react-native';

import ResultList from '../ResultList/ResultList';


//静态数据
var _data=[
    {
        'title':'主食',
        'img':require('./img/zhushi.jpg'),
        id:'28',
    },
    {
        'title':'蔬菜菌类',
        'img':require('./img/shucai.jpg'),
        id:'29',
    },
    {
        'title':'水果',
        'img':require('./img/shuiguo.jpg'),
        id:'30',
    },
    {
        'title':'零食小吃',
        'img':require('./img/lingshi.jpg'),
        id:'31',
    },
    {
        'title':'肉/蛋类',
        'img':require('./img/rou.jpg'),
        id:'32',
    },
    {
        'title':'饮品',
        'img':require('./img/yinpin.jpg'),
        id:'33',
    },
    {
        'title':'豆/奶制品',
        'img':require('./img/dou.jpg'),
        id:'44',
    },
    {
        'title':'加工食品',
        'img':require('./img/jiagong.jpg'),
        id:'45',
    },
    {
        'title':'水产品',
        'img':require('./img/shui.jpg'),
        id:'46',
    },

    {
        'title':'调味品',
        'img':require('./img/tiaoweipin.jpg'),
        id:'47',
    },
    {
        'title':'补品草药',
        'img':require('./img/bupin.jpg'),
        id:'48',
    },
    {
        'title':'坚果类',
        'img':require('./img/jianguo.jpg'),
        id:'49',
    },

];



class IndexMenu extends Component {

    componentWillMount() {
        this.indexMenuObj = new IndexMenuObj(this);
    }


    render() {

        const data = _data;

        return (

            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    flexWrap:'wrap',
                }}>

                {
                    data.map((one, index) => {

                        return (
                            <View
                                key={index}
                                style={{
                                    width:Dimensions.get('window').width/3,
                                    alignItems:'center',
                                }}>
                                <TouchableOpacity
                                    onPress={this.indexMenuObj.toResultList.bind(this.indexMenuObj,one.id,one.title)}
                                    style={{
                                        width:60,
                                        marginTop:25,
                                        }}>

                                    <View style={{width:60,}}>

                                        <Image
                                            style={{
                                                borderRadius:30,
                                                width:60,
                                                height:60,
                                                }}
                                            source={one.img} />

                                        <Text
                                            style={{
                                                textAlign: 'center',
                                        }}>
                                            {one.title}
                                        </Text>

                                    </View>

                                </TouchableOpacity>
                            </View>
                        );

                    })
                }


            </View>


        );

    }


}




class IndexMenuObj extends BaseLogicObj{

    toResultList(id,title){

        var nav=this.getProps().nav;


        nav.push(
            {
                page:(
                    <ResultList nav={nav} id={id} title={title}/>
                ),
            }
        );

    }
}


module.exports=IndexMenu;


