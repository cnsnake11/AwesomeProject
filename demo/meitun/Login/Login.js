
'use strict'


var React=require('react-native');
var css=require('./Login.css');
var baseCss=require('../../../bbt-react-native/base/BaseCss/Base.css');
var Loading=require('../../../bbt-react-native/views/Loading/Loading');
var Header=require('../Header/Header');


var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    StatusBarIOS,
    ScrollView,
    TextInput,
    Dimensions,
    Animated,
    PanResponder,
    LayoutAnimation,
    InteractionManager,
    ToastAndroid,
    }=React;

var Login =React.createClass({


    getInitialState(){
          return {
              username:null,
              password:null,


              initLoading:true,
          };
    },


    componentWillMount(){

      InteractionManager.runAfterInteractions(()=>this.setState({initLoading:false}));
    },


    render(){

        return (

            <View style={{flex:1,backgroundColor:'#f3f3f3',}}>
                <Header nav={this.props.nav} back={true} title='登录' rightBtn=' '></Header>

                {
                    this.state.initLoading==true?
                        <Loading show={true} />
                        :
                        <View style={[css.wrapper]}>
                            <TextInput value={this.state.username}
                                       autoFocus={true}
                                       onSubmitEditing={(e)=>{this.refs.pwd.focus()}}
                                       onChange={(e)=>{this.setState({username:e.nativeEvent.text})}}
                                       style={[css.textInput]} placeholder='手机号/宝宝树账号' />
                            <Image style={[css.img]} source={require('./img/login.png')}/>

                            <TextInput ref='pwd'
                                       value={this.state.password}
                                       onSubmitEditing={(e)=>{this._login()}}
                                       onChange={(e)=>{this.setState({password:e.nativeEvent.text})}}
                                       style={[css.textInput]} placeholder='请输入密码' secureTextEntry={true} />
                            <Image style={[css.img,{top:80}]} source={require('./img/pwd.png')}/>

                            <TouchableOpacity style={[css.touch]} onPress={this._login}>
                                <View style={[css.btnView]}>
                                    <Text style={[css.btnText]}>登录</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[css.touch]} >
                                <View style={[css.btnView,{backgroundColor:'#49b9c3'}]}>
                                    <Text style={[css.btnText]}>注册</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={[css.forgetTouch]}>
                                <View style={[css.forgetBtnView]}>
                                    <Text style={[css.forgetBtnText]}>忘记密码</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                }

            </View>


        );

    },


    _login(){


        if(!this.state.username){
            this._msg('用户名不能为空.');
            return ;
        }

        if(!this.state.password){
            this._msg('密码不能为空.');
            return ;
        }


        var url='http://m.meitun.com/mobile/user/signin.htm';

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": "",
                "uuid": "",
                "telephone": this.state.username,
                "password": this.state.password,
                "captchaimage": "",
                "geetest_challenge": "",
                "geetest_validate": "",
                "geetest_seccode": "",
                "oem": "IOS",
                "osversion": "8.0 ",
                "screenwidth": 414,
                "screenheight": 736,
                "apptype": "1",
                "appversion": "1.0.1",
                "nettype": "unknown",
                "regcode": "250",
                "provcode": "264",
                "partner": "babytree"
            }),
        }).then((res)=>res.json())
        .then((res)=>{

                //todo 验证码
                this._msg(res.rescode.info);

            });


    },


    _msg(s){
      if(Platform.OS=='ios'){
          alert(s);
      }else{
          ToastAndroid.show(s,ToastAndroid.LONG);
      }
    },





});


module.exports=Login;
