define(function(require) {
    'use strict';

    var util = require('common/util');

    /**
     * 字符串截取(全角)
     * @param  {string} str    目标字符串
     * @param  {number} length 长度
     * @param  {string} tail   结尾字符串
     * @return {string}        处理完的字符串
     */
    avalon.filters.caseTruncate = function(str, length, tail) {
        var flag = false;
        while (util.getGBKLength(str) > length) {
            str = str.substr(0, str.length - 1);
            flag = true;
        }
        if (tail && flag) {
            str = str + tail;
        }

        return str;
    };
});