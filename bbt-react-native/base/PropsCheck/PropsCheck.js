'use strict'

var PropsCheck={

    _compName:'PropsCheck',

    /**
     * 按照API组件定义的options进行检查
     * View组件请用RN体系的PropTypes
     * todo 仅支持must的校验
     * todo 在生产环境下关闭检查功能
     *
     * comp 被检查的组件对象
     * props 被检查的属性对象
     * defProps 被检查的属性对象的默认值对象
     */
    check(comp,props,defProps){



        if(!comp){
            console.error('comp must not be null.');
            return;
        }

        let compName=comp._compName;

        if(!compName){
            console.error('_compName must not be null.');
            return;
        }

        let opt=comp.options;

        if(!opt){
            console.error(compName+'.options must not be null.');
            return;
        }

        if(!props){
            //console.error(compName+' : props must not be null.');
            //return;
            props={};
        }

        if(!defProps){
            defProps={};
        }

        for(let key in opt){
            var o=opt[key];
            var p=props[key];

            if(o.must==true){
                if(!p){
                    console.error(compName+' : '+key+' must not be null');
                }
            }

        }



    },

};


module.exports=PropsCheck;