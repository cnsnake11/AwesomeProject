
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {
        wrapper:{
            flex:1,
            backgroundColor:'white',
        },






        topView:{
            flex:0,
            flexDirection:'row',
            alignItems:'center',
            padding:10,
            borderBottomWidth:6,
            borderBottomColor:'#eee',

        },

            topText:{
                flex:1,
                fontSize:16,
                color:'#333'
            },
            topSwitch:{
                flex:0,
            },







        middleView:{
            flex:0,
            flexDirection:'row',
            alignItems:'center',
            padding:10,
        },

            middleText:{
                flex:1,
                fontSize:16,
                color:'#333'
            },

            middleTouch:{
                flex:0,
                fontSize:16,
                color:'#333'
            },



        scrollView:{
            flex:1,
        },


        middleView2:{
            flex:1,
            flexDirection:'row',
        },
            brandView:{
                flex:0,
                margin:8,
                padding:8,
                borderRadius:8,

            },
                brandText:{
                    color:'#999',
                },

            curBrandView:{
                backgroundColor:'#00bcd4',
            },
            curBrandText:{
                color:'#fff',
                fontWeight:'bold',
            },





        bottomView:{
            flex:0,
            flexDirection:'row',

        },

            bottomTouch1:{
                flex:1,
                backgroundColor:'#999',
                padding:15,
            },
            bottomText1:{
                color:'white',
                fontSize:20,
                textAlign:'center',
            },
            bottomTouch2:{
                flex:1,
                backgroundColor:'#00bcd4',
                padding:15,
            },
            bottomText2:{
                color:'white',
                fontSize:20,
                textAlign:'center',
            },
    }
);

module.exports=css;