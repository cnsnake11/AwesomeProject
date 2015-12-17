
'use strict'


var React=require('react-native');
var {
    StyleSheet,
    }=React;

var css=StyleSheet.create(
    {

        wrapper:{
            backgroundColor:'#f3f3f3',
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
                                alignItems:'flex-end',
                            },

                                text1:{
                                    marginRight:5,
                                    fontWeight:'700',
                                },
                                newPrice:{
                                    color:'#ff9802',
                                    fontSize:18,
                                },
                                oldPrice:{
                                    textDecorationLine:'line-through',
                                    color:'#999',
                                },
                                discount:{

                                    color:'#ff9802',
                                },
                            bottomView2:{

                            },
                                salescount:{
                                    fontWeight:'bold',
                                    color:'#999',
                                }
    }
);

module.exports=css;