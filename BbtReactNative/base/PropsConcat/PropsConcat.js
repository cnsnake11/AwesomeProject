'use strict'


var PropsConcat={

    _compName:'PropsConcat',


    /**
     * 将comp中的props，写到jsx中
     */

    concat(comp,jsx){

        var props=comp.props;

        for(let key in props){

            if(comp.options[key]){//options中有定义的，说明是新组件自己的属性，不进行赋值操作
                continue;
            }

            if(jsx.props[key]){

                //todo 这种情况应该将2个属性进行合并操作，而不应该报错;如果是function就合并，如果是属性，使用用户定义的
                console.error(comp._compName+' concat props error,props '+key+' exits.');
                return;

            }

            var p=props[key];
            jsx.props[key]=p;
        }

        return jsx;
    },

};


module.exports=PropsConcat;