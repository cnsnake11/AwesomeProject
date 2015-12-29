
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

class Detail extends Component {

    constructor(){
        super();
        this.state={
            querying:true,
            initAnimateing:true,
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

        return (

            <View style={{backgroundColor: 'efeff4', flex: 1,}}>

                <Header title={title} nav={nav} />

                {
                    this.state.querying==true||this.state.initAnimateing==true?
                        <Loading show={true} />
                        :
                        <ScrollView>
                            <Image
                                style={{
                                    width:Dimensions.get('window').width,
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
                        </ScrollView>
                }


            </View>
        );

    }


}


class DetailObj extends BaseLogicObj{


    constructor(root){
        super(root);
        this.data={
            img:'',
            canEatList:[],
        };
        this.icon1=require('../ResultList/img/1.png');
        this.icon2=require('../ResultList/img/2.png');
        this.icon3=require('../ResultList/img/3.png');
    }


    query(id) {

        let url = `http://www.babytree.com/api/mobile_toolcms/can_eat_detail?id=${id}`;

        fetch(url).
            then((res)=>res.text()).
            then((res)=>{


                let str = res.substring(res.indexOf('img src="')+'img src="'.length,res.length);
                this.data.img = str.substring(0,str.indexOf('"/>'));

                this.processCanEatList(str);

                this.setState({querying:false,});
            });



    }


    processCanEatList(str){
        let index=str.indexOf('"caneat-title">');



        if(index!=-1){
            let title;
            let status;
            let des;
            let icon;

            str=str.substring(index+'"caneat-title">'.length,str.length);
            title=str.substring(0,str.indexOf('</h1>'));

            index=str.indexOf("<em>");
            str=str.substring(index+'<em>'.length,str.length);
            status=str.substring(0,str.indexOf('</em>'));

            index=str.indexOf('class="text">');
            str=str.substring(index+'class="text">'.length,str.length);
            des=str.substring(0,str.indexOf('</div>'));


            if(status==='能吃'){
                icon=this.icon1;
            }else if(status=='少吃'){
                icon=this.icon2;
            }else if(status=='不能吃'){
                icon=this.icon3;
            }


            this.data.canEatList.push(
                {
                    title:title,
                    status:status,
                    des:des,
                    icon:icon,
                }
            );

            this.processCanEatList(str);
        }


    }

}


module.exports = Detail;


