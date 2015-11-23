
'use strict'

var React=require('react-native');


var {
    StyleSheet,
    }=React;


var css=StyleSheet.create({
    wrapper:{
        flexDirection:'row',

        justifyContent:'center',
    },
        cellView:{
            flex:1,
            alignItems:'center',
            paddingBottom:2,
            paddingTop:4,
            backgroundColor:"#f5f5f5"
        },
            cellImage:{
                height:20,
                width:20,
                marginBottom:2,
            },
            cellText:{
                fontSize:12,
                textAlign:'center',
                color:'#666',
            },
        cellView_actived:{
            backgroundColor:'#1ca9bd',
        },
            cellText_actived:{
                color:'#fff',
            },
});


module.exports=css;