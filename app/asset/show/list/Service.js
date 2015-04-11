/**
 * @file 账户消息数据
 * @author mayue@baidu.com
 */
define(function(require) {
    'use strict';
    var $ = require('jquery');
    var Service = require('avalonFrame/Service').derive();

    /**
     * 定义服务接口
     * @type {Object}
     */
    Service.prototype.interface = {
        /**
         * 获取消息列表及相关信息
         * @param  {Object} params 请求的参数
         * @param  {number} params.categoryId 消息类别
         * @param  {number} params.tagId 标签id
         * @param  {number} params.page 页码
         * @param  {number} params.status 状态类型
         * @return {Object} 请求的promise对象
         */
        getMessage: function(params) {
            return $.request('getMessageList', {
                categoryId: params.categoryId,
                tagId: params.tagId,
                page: params.page,
                status: params.status
            }).then(
                function(res) {
                    res.data.pages = getPageArray(res.data.pageNum);
                    return res.data;
                },
                function() {
                    return {hasError: true};
                }
            );
        }
    };

    /**
     * 获得分页数组
     * @param  {number} pageNum 分页数目
     * @return {Array} 分页数组 从1开始
     */
    function getPageArray(pageNum) {
        var pages = [];
        for (var i = 0; i < pageNum; i++) {
            pages.push(i + 1);
        }
        return pages;
    }

    return Service;
});