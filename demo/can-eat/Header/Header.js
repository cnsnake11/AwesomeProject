
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


                {
                    this.props.rightBtn?
                        <TouchableOpacity style={[css.titleBtnTouch]} onPress={this.props.rightBtnPress} >
                            <Text style={[css.titleBtnText]}>{this.props.rightBtn}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[css.titleBtnTouch]}  >
                            <Text style={[css.titleBtnText]}> </Text>
                        </TouchableOpacity>
                }




            </View>
        );

    }


}



var css=StyleSheet.create(
    {

        titleView:{
            backgroundColor:'#ff537b',
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
            padding:11,
            width:53,
        },
        titleBtnText:{
            color:'#fff',
            fontSize:12,

            opacity:1,
        },
    }
);


module.exports=Header;



