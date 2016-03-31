'use strict';


let BBUserDataRNM = {

    /**
     * 用户是否登陆
     * @return {promise} then(res => {})
     * res.data {boolean} true为登录成功 false为登录失败
     */
    isLogin() {},

    /**
     * 获得登录用户信息
     * @return {promise} then(res => {})
     * res.data {object} 登录用户信息，如果当前未登录，res.data为空
     * res示例:{"status":"success","data":{"uid":"u1170966226","userName":"cnsnake11","userLevel":"1","userAvatar":"http://img01.test1.babytree-dev.com/img/common/100x100.gif","babyBirthDay":"1477411200","userGender":"","loginString":"u1170966226_7eca53d3091f52d2a27f7ed370e06456_1455850878","userEmail":"mobilevistorpual1knlv1@mobile.com"}}
     */
    getUserInfo() {},

}