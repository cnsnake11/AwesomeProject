
'use strict'


var React=require('react-native');

var {
    StyleSheet,
    }=React;


var css=StyleSheet.create({

    sectionWrapperView:{
        flexDirection:'row',
        padding:8,
        marginTop:10,
    },
        sectionTouch:{
            flex:1,
        },
            sectionCellView:{
                alignItems:'center',
            },
                sectionTopText:{
                    textAlign:'center',
                    paddingBottom:3,
                    color:'#999',
                },
                sectionBottomText:{
                    textAlign:'center',
                    fontSize:10,
                    color:'#999',
                },

                sectionActiveText:{
                    color:'#000',
                },

                sectionBottomBorderView:{
                    backgroundColor:'#1ca9bd',
                    width:70,
                    height:2,
                },


    touch:{
        marginTop:10,
    },

        image:{
            height:155,
            resizeMode:'cover',
        },


        textView:{
            backgroundColor:'#f5f5f5',
            flexDirection:'row',
            alignItems:'center',
            paddingLeft:10,
            height:45,
        },

            textText:{
                flex:.6,
            },

            discountView:{
                marginRight:10,
                flex:.4,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'flex-end',
            },
                discountImage:{},
                discountText:{
                    color:'#ff9800',
                },

            kttxTouch:{
                flex:.4,
                flexDirection:'row',
                justifyContent:'flex-end',
            },

                kttxView:{
                    width:100,
                    height:45,
                    backgroundColor:'#00bcd6',
                    alignItems:'center',
                    justifyContent:'center',
                },
                    kttxText:{
                        color:'#fff',
                        fontWeight:'bold',
                    },



        timeView:{
            height:19,
            paddingLeft:5,
            paddingRight:2,
            backgroundColor:'#333',
            flexDirection:'row',
            opacity:.7,
            position:'absolute',
            top:10,
            right:0,
            alignItems:'center',
            justifyContent:'center',
            borderTopLeftRadius:10,
            borderBottomLeftRadius:10,
        },
            timeImage:{
                height:13,
                resizeMode:'contain',
            },
            timeText:{
                color:'#fff',
                fontSize:12,
                fontWeight:'bold',
              },

});

module.exports=css;