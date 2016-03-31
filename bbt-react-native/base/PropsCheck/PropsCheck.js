'use strict';

let PropsCheck = {

    _compName: 'PropsCheck',

    /**
     * 按照API组件定义的options进行检查
     * View组件请用RN体系的PropTypes
     * todo 仅支持must的校验
     * todo 在生产环境下关闭检查功能
     *
     * @param {object} comp 被检查的组件对象
     * @param {object} props 被检查的属性对象
     * @param {object} defProps 被检查的属性对象的默认值对象
     * @return {void}
     */
    check(comp, props, defProps) {

        if (!comp) {
            console.error('comp must not be null.');
            return;
        }

        let compName = comp._compName;

        if (!compName) {
            console.error('_compName must not be null.');
            return;
        }

        let opt = comp.options;

        if (!opt) {
            console.error(compName + '.options must not be null.');
            return;
        }

        if (!props) {

            // console.error(compName+' : props must not be null.');
            // return;
            props = {};
        }

        if (!defProps) {
            defProps = {};
        }

        for (let key in opt) {
            let one = opt[key];
            let prop = props[key];

            if (one.must === true) {
                if (!prop) {
                    console.error(compName + ' : ' + key + ' must not be null');
                }
            }

        }

    },

};


module.exports = PropsCheck;
