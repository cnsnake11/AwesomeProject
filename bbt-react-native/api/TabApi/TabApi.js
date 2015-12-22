
'use strict'

var propsCheck=require('../../base/PropsCheck/PropsCheck');


/**
 * 功能较为简单 暂不推荐使用
 * 为tab标签类的组件提供记录状态等常用接口
 */
class Tab {

    constructor(props) {

        this._compName='TabApi';

        this.options={

            /**
             * 当前处于活动状态的tab页签名
             */
            curName:{
                must:true,
                type:'string',
            },
        };

        propsCheck.check(this,props);
        this.props=props;


        this._curName=this.props.curName;

    }


    /**
     * 点击一个tab
     * @param name 被点击tab的名字
     */
    clicked(name){
        this._curName=name;
    }

    /**
     * 当前处于活动状态的tab页签名
     * @returns {String}
     */
    getCurName(){
        return this._curName;
    }

    /**
     * 判断传入的name是否是当前活动的tab
     * @param name
     * @returns {boolean}
     */
    isCur(name){
        return this._curName==name;
    }

};



module.exports=Tab;