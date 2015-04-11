/**
 * @file 消息展示导航的数据
 */
define(function(require) {
    'use strict';
    var $ = require('jquery');
    var Service = require('avalonFrame/Service').derive();
    var util = require('common/util');

    /**
     * 定义服务接口
     * @type {Object}
     */
    Service.prototype.interface = {
        // 消息类型列表
        getCategories: function(categoryId) {
            return $.request('getMccMessageCategory').then(
                function(res) {
                    var ret = {};
                    ret.categories = res.data;
                    ret.categoriesOrigin = res.data.slice(0);
                    ret.categoryId = categoryId
                        ? categoryId
                        : (+util.queryToJson(window.location.search).categoryId || ret.categories[0].id);
                    ret.searchText = '';

                    return ret;
                },
                function() {
                    return {hasError: true};
                }
            );
        }
    };

    return Service;
});