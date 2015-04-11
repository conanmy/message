/*
 * @file 扩展
 *
 * @author 俞天翔(yutianxiang@baidu.com)
 */
define(function(require) {
    'use strict';
    var $ = require('jquery');
    var env = require('common/env');
    var Modal = require('commonUI/Modal');

    $.extend({
        request: function(path, opts) {
            var deferred = $.Deferred();
            $.ajax({
                url: path + '.ajax',
                data: {
                    path: path,
                    userid: env.get('userid'),
                    token: env.get('token'),
                    params: JSON.stringify(opts) || '{}'
                },
                type: 'post',
                dataType: 'json'
            }).done(function(response) {
                if (+response.status === 200) {
                    if (response.redirect === 'true') {
                        location.href = 'http://cas.baidu.com/?action=logout';
                    }
                    deferred.resolve(response);
                } else {
                    deferred.reject(response);
                    var alert = new Modal({
                        id:'server-error',
                        title: '提示',
                        content: '服务器异常，请刷新页面重新尝试',
                        type: 'alert'
                    });
                    alert.show();
                }
            }).fail(function(response) {
                deferred.reject(response);
                var alert = new Modal({
                    id: 'server-error',
                    title: '提示',
                    content: '服务器异常，请刷新页面重新尝试',
                    type: 'alert'
                });
                alert.show();
            });

            return deferred.promise();
        }
    });
});