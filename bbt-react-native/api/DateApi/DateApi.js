
'use strict';

class DateApi {

    /**
     * 获得传入的毫秒字符串msStr距离现在时间的字符串
     * @param {string} msStr 毫秒字符串除以1000之后
     * @return {string} 可以显示用的字符串
     */
    static getTimeFromGive(msStr) {
        let ms = msStr / 1;
        let now = new Date().getTime() / 1000;
        ms = now - ms;

        let min = 60;
        let hour = 60 * min;
        let day = 24 * hour;
        let max = 7 * day;// 最大值，超过这个值，就显示日期

        if (ms < min) {
            return '1分钟之内';
        }

        if (ms >= min && ms < hour) {
            return `${parseInt(ms / min)}分钟前`;
        }

        if (ms >= hour && ms < day) {
            return `${parseInt(ms / hour)}小时前`;
        }

        if (ms >= day && ms <= max) {
            return `${parseInt(ms / day)}天前`;
        }

        if (ms > max) {
            let date = new Date((msStr / 1) * 1000);
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            return `${date.getFullYear()}-${month}-${date.getDate()}`;
        }
    }

    /**
     * 将输入的毫秒字符串or毫秒数转换成指定的字符串格式
     * @param {string} msStr 毫秒字符串 or 毫秒数
     * @param {string} fmt yyyy-MM-dd or yyyy-MM-dd HH:mm:ss
     * @return {string} 转换后的字符串
     */
    static format(msStr, fmt) {

        let date = new Date(msStr / 1);

        let obj = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length));
        }
        for (let k in obj) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[k]) : (("00" + obj[k]).substr((String(obj[k])).length)));
            }
        }

        return fmt;
    }

}

module.exports = DateApi;
