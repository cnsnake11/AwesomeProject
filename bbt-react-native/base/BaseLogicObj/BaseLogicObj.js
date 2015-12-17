


'use strict'

class BaseLogicObj{


    constructor(root){
        if(!root){
            console.error('实例化BaseLogicObj必须传入root组件对象.');
        }
        this.root=root;
    }

    getState(){
        return this.root.state;
    }

    setState(s){
        this.root.setState(s);
    }

}

module.exports=BaseLogicObj;