
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {

        wrapper:{

        },

            listRowView:{
                backgroundColor:'#fff',
                height:120,

                padding:10,
                flexDirection:'row',

                borderBottomWidth:1,
                borderBottomColor:'#eee',
                borderStyle:'solid',
            },

                listLeftView:{
                    width:120,
                },

                listRightView:{
                    flex:1,
                },

                    listImage:{
                        height:100,
                        resizeMode:'contain',
                    },


                        topView:{
                            flex:1,
                        },
                        bottomView:{
                            flex:0,
                        },

                            bottomView1:{
                                flexDirection:'row',
                            },

                                text1:{
                                    marginRight:5,
                                },
                            bottomView2:{

                            },
    }
);

module.exports=css;