
'use strict'

import React, {
    Component,
    View,
    InteractionManager,
    Text,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

import {
    BaseLogicObj,
    Loading,
} from '../../../bbt-react-native';

import Header from '../Header/Header';
import DetailObj from './DetailObj';
import Share from '../Share/Share';

class Detail extends Component {

    constructor(){
        super();
        this.state={
            querying:true,
            initAnimateing:true,
            showShare:true,
        };
    }

    componentWillMount() {
        this.detailObj = new DetailObj(this);
        this.detailObj.query(this.props.id);
        InteractionManager.runAfterInteractions(()=>{
            this.setState({initAnimateing:false,});
        });
    }


    render() {

        const {nav, title} = this.props;
        const data=this.detailObj.data;
        const width=Dimensions.get('window').width;

        return (

            <View style={{backgroundColor: 'efeff4', flex: 1,}}>

                <Header title={title}
                        nav={nav}
                        rightBtn='分享'
                        rightBtnPress={this.detailObj.showShare.bind(this.detailObj)} />

                {
                    this.state.querying==true||this.state.initAnimateing==true?
                        <Loading show={true} />
                        :
                        <ScrollView>
                            <Image
                                style={{
                                    width:width,
                                    height:260,
                                }}
                                source={{uri:data.img}}/>
                            {
                                data.canEatList.map((one,i)=>{
                                    return (
                                        <View
                                            key={i}
                                            style={{
                                                backgroundColor:'fff',
                                                padding:10,
                                                marginBottom:10,
                                            }}
                                            >

                                            <Text
                                                style={{
                                                    color:'#ff537b',
                                                    fontWeight:'700',
                                                }}>
                                                {one.title}
                                            </Text>
                                            <View
                                                style={{
                                                    marginTop:5,
                                                    marginBottom:5,
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                }}>
                                                 <Image
                                                     style={{
                                                    width: 15,
                                                    height:15,
                                                    resizeMode: 'contain',
                                                }}
                                                     source={one.icon} />
                                                 <Text
                                                     style={{
                                                    color:'#666',
                                                }}>
                                                     {one.status}
                                                 </Text>
                                            </View>

                                             <Text
                                                style={{
                                                    color:'#666',
                                                }}>
                                                {one.des}
                                            </Text>
                                        </View>
                                    );
                                })
                            }


                            {
                                data.adImg?
                                    <Image
                                        style={{
                                            width: width,
                                            height: 100,
                                            resizeMode: 'stretch',
                                            marginBottom: 10,
                                        }}
                                        source={{
                                            uri: data.adImg,
                                        }}/>
                                    :
                                    null
                            }


                            {
                                data.tips?
                                    <View
                                        style={{
                                            backgroundColor: 'fff',
                                            marginBottom: 10,
                                         }}>
                                        <Image
                                            source={require('./img/tips.png')}
                                            style={{
                                                height:40,
                                                width:120,
                                                resizeMode: 'stretch',
                                                justifyContent:'center',
                                                paddingLeft:20,
                                            }}>
                                            <Text
                                                style={{
                                                    color:'fff',
                                                    fontWeight:'700',
                                                    backgroundColor:'transparent',
                                                }}>
                                                小贴士
                                            </Text>
                                        </Image>
                                        <View
                                            style={{
                                                margin:10,
                                            }}>
                                            <Text>
                                                {data.tips}
                                            </Text>
                                        </View>

                                    </View>
                                    :
                                    null
                            }


                        </ScrollView>
                }


                <Share
                    show={this.state.showShare}
                    onPressCancel={this.detailObj.hideShare.bind(this.detailObj)}
                    />

            </View>
        );

    }


}


module.exports = Detail;


