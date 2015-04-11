/**
 * @file 账户消息主文件
 * @author mayue@baidu.com
 */
define(function(require) {
    'use strict';
    var ViewModel = require('avalonFrame/ViewModel').derive();
    var $ = require('jquery');
    var _ = require('underscore');
    var bizLog = require('common/extension/log');

    ViewModel.prototype.moduleId = 'mccMessageList';
    ViewModel.prototype.template = require('text!./main.html');
    ViewModel.prototype.service = require('./Service');
    ViewModel.prototype.datasource = function(service, context) {
        return service.runService('getMessage', context.params);
    };

    ViewModel.prototype.initBehavior = function(vmodel) {
        var me = this;

        vmodel.changeStatus = function(status) {
            changeLoadParams(me, {
                status: status,
                page: 1
            });
        };
        
        vmodel.changeTag = function(tagId) {
            changeLoadParams(me, {
                tagId: tagId,
                page: 1
            });
        };
        
        vmodel.changePage = function(page) {
            changeLoadParams(me, {
                page: page
            });

            scroll(0, 0);
        };
        
        vmodel.checkIt = function(index) {
            vmodel.message.list[index].checked = this.checked;

            var $checkAll = $('#check-all-message');

            var checkedNum = 0;
            var list = vmodel.message.list;
            for (var i = 0; i < list.length; i ++) {
                var item = list[i];
                if (item.checked === true) {
                    checkedNum ++;
                }
            }

            if (this.checked === true) {
                if (checkedNum === 1) {
                    $('#mark-message-read').removeClass('disable');
                }
                if (checkedNum === list.length) {
                    $checkAll.prop('checked', true);
                }
            } else {
                if (checkedNum === (list.length - 1)) {
                    $checkAll.prop('checked', false);
                }
                if (checkedNum === 0) {
                    $('#mark-message-read').addClass('disable');
                }
            }
        };
        
        vmodel.markRead = function() {
            var checkedMessageIds = [];
            var modTypeIds = [];
            var list = vmodel.message.list;
            for (var i = 0; i < list.length; i ++) {
                var item = list[i];
                if (item.checked === true) {
                    checkedMessageIds.push(item.msgId);
                    if (+item.status === 1) {
                        modTypeIds.push(item.typeid);
                    }
                }
            }
            if (checkedMessageIds.length > 0) {
                $.request('sendMessageRead',
                    {messages: checkedMessageIds, categoryId:vmodel.categoryId}
                ).done(function() {
                    changeLoadParams(me);
                    vmodel.$fire('numChange', vmodel.categoryId);
                    bizLog.send({
                        target: 'view',
                        subTarget: 'batch-mark-success',
                        typeid: checkedMessageIds.join(',')
                    });
                    if (modTypeIds.length > 0) {
                        _.each(modTypeIds, function(item) {
                            bizLog.send({
                                target: 'view',
                                subTarget: 'mark-success',
                                typeid: item
                            });
                        });
                    }
                });
            }
        };
        
        vmodel.checkAll = function() {
            $('.message-list input').prop('checked', this.checked);
            var list = vmodel.message.list;
            for (var i = 0; i < list.length; i ++) {
                var item = list[i];
                item.checked = this.checked;
            }

            $('#mark-message-read')[(this.checked ? 'remove' : 'add') + 'Class']('disable');
        };

        vmodel.markIt = function(index) {
            var message = vmodel.message.list[index];
            if (+message.status === 2) {
                return;
            }

            $.request('sendMessageRead',
                {
                    messages: [message.msgId],
                    categoryId: vmodel.categoryId
                }
            ).done(
                function() {
                    changeLoadParams(me);
                    vmodel.$fire('numChange', vmodel.categoryId);
                    bizLog.send({
                        target: 'view',
                        subTarget: 'mark-success',
                        typeid: message.typeid
                    });
                }
            );
        };

        vmodel.changeSubCategory = function(event) {
            changeLoadParams(me, {
                subCategoryId: +event.target.value
            });
        };
    };

    ViewModel.prototype.entercomplete = function(vmodel, service) {
        service.bindViewModel('getMessage', vmodel);
        vmodel.$watch('message', function(message) {
            window.setTimeout(function() {
                if ($('#mcc-message-sub-category')[0]) {
                    $('#mcc-message-sub-category')[0].value = message.currentSubCategoryId;
                }
            }, 0);
            vmodel.$fire('reloaded');
        });
    };

    /**
     * 改变参数，触发重新加载
     * @param {Obejct} params 参数
     * @param {number} params.page 要进入的页码
     * @param {string} params.tagId 要获取的tagId
     * @param {number} params.status 要获取的status 已读1/未读0/全部2
     */
    function changeLoadParams(me, params) {
        var currentParams = {
            categoryId: me.vmodel.categoryId,
            page: me.vmodel.message.currentPage,
            status: me.vmodel.message.currentStatus,
            subCategoryId: me.vmodel.message.currentSubCategoryId
        };

        for (var key in params) {
            currentParams[key] = params[key];
        }

        me.service.runService('getMessage', currentParams);
    }

    return ViewModel;
});