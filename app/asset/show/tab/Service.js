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
        /**
         * 获取消息类型列表
         * @param  {Object} params 需要带入的下层消息列表请求参数
         * @param  {number} params.categoryId 消息类别
         * @param  {number} params.tagId 标签id
         * @param  {number} params.page 页码
         * @param  {number} params.status 状态类型
         * @return {Object} 请求的promise对象
         */
        getCategories: function(params) {
            return $.request('getMessageCategory').then(
                function(res) {
                    var ret = {};
                    var query = util.queryToJson(window.location.search);
                    ret.categories = res.data;
                    ret.params = params || {
                        categoryId: +query.categoryId || ret.categories[0].id,
                        status: query.status,
                        tagId: query.tagId
                    };

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