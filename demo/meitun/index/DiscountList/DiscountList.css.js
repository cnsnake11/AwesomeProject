
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
            padding:10,
        },


        timeView:{
            width:80,
            height:19,
            backgroundColor:'#333',
            flexDirection:'row',
            opacity:0.7,
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