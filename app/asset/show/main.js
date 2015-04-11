/**
 * @file 消息展示模块主文件
 * @author mayue@baidu.com
 */
define(function(require) {
    'use strict';
    var $ = require('jquery');
    var env = require('common/env');
    var ViewModel = require('avalonFrame/ViewModel').derive();
    
    var defaultShowModule = require('show/tab/main');
    var mccShowModule = require('mccShow/tab/main');

    ViewModel.prototype.moduleId = 'show';
    ViewModel.prototype.template = require('text!./main.html');

    ViewModel.prototype.beforeenter = function() {
        var target = $('#main-tab-show');
        target.siblings().removeClass('active');
        target.addClass('active');
    };
    
    ViewModel.prototype.entercomplete = function() {
        var me = this;

        var targetModule = null;
        switch (env.get('systemType')) {
            case 0:
                targetModule = defaultShowModule;
                break;
            case 1:
                targetModule = mccShowModule;
                $('#main-tab-setting').hide();
                break;
            default:
                targetModule = defaultShowModule;
        }

        var watch = function(vm) {
            vm.$watch('reloadTab', function(params) {
                me.loadViewModel({
                    container: 'message-tab',
                    ViewModel: targetModule,
                    params: params
                }, watch);
            });
        };

        // 异步加载消息展示左侧导航
        me.loadViewModel({
            container: 'message-tab',
            ViewModel: targetModule
        }, watch);

        me.refreshInterval = window.setTimeout(function() {
            window.location.reload();
        }, 60 * 60 * 1000);
    };

    ViewModel.prototype.onleave = function() {
        window.clearInterval(this.refreshInterval);
    };

    return ViewModel;
});