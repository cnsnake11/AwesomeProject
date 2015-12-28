
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
} from 'react-native';


class Header extends Component{

    render(){

        var nav=this.props.nav;


        return (
            <View style={[css.titleView,{flex: 0},React.Platform.OS=='ios'?css.iosTitleView:'',this.props.style]}>


                 <TouchableOpacity style={[css.titleBtnTouch]}
                                  onPress={()=>{
                                    if(nav){
                                        nav.pop()
                                    }else{
                                        console.error('获得不到导航器对象.');
                                    }
                                  }}  >
                    <Text style={[css.titleBtnText]}>返回</Text>
                </TouchableOpacity>



                 <Text numberOfLines={1} style={[css.titleText]}>{this.props.title}</Text>



                     <TouchableOpacity style={[css.titleBtnTouch]} onPress={this.props.rightBtnPress} >
                        <Text style={[css.titleBtnText]}>分享</Text>
                    </TouchableOpacity>


            </View>
        );

    }


}



var css=StyleSheet.create(
    {

        titleView:{
            backgroundColor:'#ff537b',
            padding:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
        },
        iosTitleView:{
            paddingTop:20,
        },

        titleText:{
            flex:1,
            color:'#fff',
            fontSize:16,
            textAlign:'center',
        },


        titleBtnTouch:{
            paddingLeft:5,
            paddingRight:5,
            width:40,
        },
        titleBtnText:{
            color:'#fff',
            fontSize:12,

            opacity:1,
        },
    }
);


module.exports=Header;



