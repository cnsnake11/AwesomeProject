'use strict';


let BBToolRNM = {

    /**
     * 提供当前网络的主域名.
     * ios中方便摇一摇切换环境时ReactNative可以自动切换.
     * @return {promise} then(res => {})
     * res.data {string} 当前网络的主域名
     */
    currentHostName() {},


    /**
     * 友盟统计
     * @param  {object} req
     *     {
     *      "event":event,//事件
     *      "label":label,//标签
     *     }
     * @return {promise} then(null => {}) 成功会执行resolve 失败会执行reject
     */
    umengLog(req) {},


    /**
     * babytree统计
     * @param  {object} req
     *     {
     *      "type":type,//点击事件类型
     *      "id":id,//点击事件id
     *     }
     * @return {promise} then(null => {}) 成功会执行resolve 失败会执行reject
     */
    babytreeLog(req) {},


}