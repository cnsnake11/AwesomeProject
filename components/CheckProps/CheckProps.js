'use strict'

var CheckProps={

    _compName:'CheckProps',

    /**
     * 按照组件定义的options进行检查
     * 一般在componentWillMount中使用
     * todo 仅支持must的校验
     * todo 在生产环境下关闭检查功能
     */
    check(comp){

        if(!comp){
            console.error('comp must not be null.');
            return;
        }

        var compName=comp._compName;

        if(!compName){
            console.error('_compName must not be null.');
            return;
        }

        var opt=comp.options;

        if(!opt){
            console.error(compName+'.options must not be null.');
            return;
        }

        var props=comp.props;

        for(let key in opt){
            var o=opt[key];
            var p=props[key];

            if(o.must==true){
                if(!p){
                    console.error(compName+'.'+key+' must not be null');
                }
            }

        }



    },

};


module.exports=CheckProps;