/*
 * @file env
 *
 * @author 俞天翔(yutianxiang@baidu.com)
 */
define(function() {
    'use strict';
    var env = {};
    return {
        set: function(id, opts) {
            env[id] = opts;
        },
        get: function(id) {
            return env[id];
        }
    };
});