define(function(require) {
    'use strict';
    var log = require('common/log');

    return {
        mark: '',
        init: function(mark) {
            this.mark = mark;
        },
        /**
         * 发送业务监控
         * @param  {Object} params 发送参数
         * @param  {string} params.target 监控主标识
         */
        send: function(params) {
            params.target = this.mark + params.target;
            log.log(params);
        }
    };

});