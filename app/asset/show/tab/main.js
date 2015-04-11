/**
 * @file 消息展示模块主文件
 * @author mayue@baidu.com
 */
define(function(require) {
    'use strict';
    var ViewModel = require('avalonFrame/ViewModel').derive();

    ViewModel.prototype.moduleId = 'messageTab';
    ViewModel.prototype.template = require('text!./main.html');
    ViewModel.prototype.service = require('./Service');
    ViewModel.prototype.datasource = function(service, context) {
        return service.runService('getCategories', context.params);
    };

    ViewModel.prototype.initBehavior = function(vmodel) {
        var me = this;
        vmodel.changeTab = function(categoryId) {
            me.vmodel.$fire('reloadTab', {categoryId: categoryId});
        };
    };

    ViewModel.prototype.entercomplete = function(vmodel, service) {
        var me = this;
        
        service.bindViewModel('getCategories', vmodel);
        return !vmodel.hasError && showMessage(me, vmodel.params.$model);
    };

    /**
     * 展示消息
     * @param  {Object} me 当前ViewModel实例
     * @param  {Object} defaultParams 带入的参数
     */
    function showMessage(me, defaultParams) {
        var params = {
            categoryId: me.vmodel.categories[0].id,
            status: 0,
            tagId: 0,
            page: 1
        };
        for (var key in defaultParams) {
            params[key] = defaultParams[key];
        }

        me.loadViewModel({
            container: 'message-main',
            ViewModel: require('show/list/main'),
            params: params
        }, function(vm) {
            vm.$watch('reloadTab', function(params) {
                me.vmodel.$fire('reloadTab', params);
            });
        });
    }

    return ViewModel;
});