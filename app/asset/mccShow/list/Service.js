/**
 * @file 账户消息数据
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
        getMessage: function(params) {
            return $.request('getMccMessageList', {
                categoryId: params.categoryId,
                tagId: params.tagId,
                page: params.page,
                status: params.status,
                subCategoryId: params.subCategoryId
            }).then(
                function(res) {
                    res.data.pages = getPageArray(res.data.pageNum);
                    return {
                        categoryId: params.categoryId,
                        message: res.data
                    };
                },
                function() {
                    return {message: {hasError: true}};
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