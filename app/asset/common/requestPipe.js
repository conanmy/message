/*
 * @file ajax管道，缓冲同path，无参数的情况
 * 后续会增加同params（结构一致）的情况
 *
 * @author Skyline Yu(yutianxiang@baidu.com)
 */
define(function(require) {
    'use strict';
    // 保存ajax请求promise
    var ajaxCache = {};
    var $ = require('jquery');

    return {
        request: function(path, params) {
            // TODO: 考虑params的顺序问题
            var cacheID = path + '_' + JSON.stringify(params);

            if (!ajaxCache[cacheID]) {
                ajaxCache[cacheID] = $.request(path, params);
            }
            
            return ajaxCache[cacheID];
        }
    };
});