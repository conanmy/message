/*
 * @file 工具方法
 *
 * @author Skyline Yu(yutianxiang@baidu.com)
 */
define(function (require) {
    'use strict';
    var $ = require('jquery');
    var env = require('common/env');
    /**
     * 替换某一组连接中的{userid}
     * @param  {Object} links 相关配置组
     * @param {String} key URL所在的属性
     */
    function replaceUserID(links, key) {
        for (var i in links) {
            if (typeof links[i][key] === 'string') {
                links[i][key] = links[i][key].replace('{userid}', env.get('userId'));
            }
            if (i === key) {
                links[i] = links[i].replace('{userid}', env.get('userId'));
            }
        }
    }

    /**
     * 字符串转换为json
     *
     * @inner
     * @param  {string} 字符串
     * @return {Object} 返回的json对象
     */
    function queryToJson(query) {
        query = query || '';
        var queryTest = /[\w\d_]+\=[^&]*(\&[\w\d_]+\=[^&]*)*/;
        var result = query.match(queryTest);
        query = result ? result[0] : '';
        var params = query.split('&');
        var len = params.length;

        var key;
        var value;
        var item;
        var param;

        result = {};

        for (var i = 0; i < len; i++) {
            if (!params[i]) {
                continue;
            }
            param = params[i].split('=');
            key = param[0];
            value = decodeURIComponent(param[1]);

            item = result[key];
            if (typeof item === 'undefined') {
                result[key] = value;
            } else if ($.type(item) === 'array') {
                item.push(value);
            } else {
                result[key] = [item, value];
            }
        }
        return result;
    }

    /**
     * 获取中文字符长度
     * @param  {string} value 需要判断长度的字符串
     * @return {number}       返回字符串长度
     */
    function getGBKLength(value) {
        var len = value.length;
        value.replace(/[^\x00-\xff]/g, function () {
            len++;
        });
        return len;
    }

    var util = {
        replaceUserID: replaceUserID,
        queryToJson: queryToJson,
        getGBKLength: getGBKLength
    };

    // `bind`的实现特别使用引擎原生的，
    // 因为自己实现的`bind`很会影响调试时的单步调试，
    // 跳进一个函数的时候还要经过这个`bind`几步很烦，原生的就不会
    var nativeBind = Function.prototype.bind;
    /**
     * 固定函数的`this`变量和若干参数
     *
     * @param {Function} fn 操作的目标函数
     * @param {Mixed} context 函数的`this`变量
     * @param {Mixed...} args 固定的参数
     * @return {Function} 固定了`this`变量和若干参数后的新函数对象
     */
    util.bind = nativeBind
        ? function (fn) {
            return nativeBind.apply(fn, [].slice.call(arguments, 1));
        }
        : function (fn, context) {
            var extraArgs = [].slice.call(arguments, 2);
            return function () {
                var args = extraArgs.concat([].slice.call(arguments));
                return fn.apply(context, args);
            };
        };

    /**
     * 解析目标URL中的参数成json对象
     * 
     * @param {string} url 目标URL
     * @return {JSON} 解析结果对象
     */
    util.queryToJson = function (url) {
        var query   = url.substr(url.indexOf('?') + 1);
        var params  = query.split('&');
        var len     = params.length;
        var result  = {};
        var key;
        var value;
        var item;
        var param;
        
        for (var i = 0; i < len; i++) {
            param   = params[i].split('=');
            key     = param[0];
            value   = param[1];
            
            item = result[key];
            if ('undefined' === typeof item) {
                result[key] = value;
            } else if (Object.prototype.toString.call(item) === '[object Array]') {
                item.push(value);
            } else { // 这里只可能是string了
                result[key] = [item, value];
            }
        }
        
        return result;
    };

    return util;
});