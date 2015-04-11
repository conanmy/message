/**
 * @file 消息展示模块主文件
 * @author mayue@baidu.com
 */
define(function(require) {
    'use strict';
    var _ = require('underscore');
    var $ = require('jquery');
    var util = require('common/util');
    var ViewModel = require('avalonFrame/ViewModel').derive();

    var ACCOUNT_CATEGORY_ID = 2;  // 账户列表父级Id
    var MANAGER_CATEGORY_ID = 1;  // 账户管家消息Id

    ViewModel.prototype.moduleId = 'mccMessageTab';
    ViewModel.prototype.template = require('text!./main.html');
    ViewModel.prototype.service = require('./Service');
    ViewModel.prototype.datasource = function(service) {
        return service.runService('getCategories');
    };

    ViewModel.prototype.initBehavior = function(vmodel) {
        var me = this;
        vmodel.changeTab = function(categoryId) {
            if (categoryId === ACCOUNT_CATEGORY_ID) {
                return;
            }
            vmodel.categoryId = categoryId;
            showMessage(me, {categoryId: categoryId});
        };

        vmodel.searchTab = function(index) {
            var userList = vmodel.categoriesOrigin[index].subCategoryList;
            var searchText = vmodel.searchText;
            var filteredUserList = _.filter(userList, function(item) {
                return (item.name.indexOf(searchText) > -1);
            });

            vmodel.categories[index].subCategoryList = filteredUserList;
            getNewMessageNum(filteredUserList);
        };

        vmodel.clearSearch = function(index) {
            vmodel.searchText = '';
            vmodel.searchTab(index);
        };
    };

    ViewModel.prototype.entercomplete = function(vmodel, service) {
        var me = this;

        var getMessageNum = function(categories) {
            _.each(categories, function(item) {
                if (item.id === ACCOUNT_CATEGORY_ID) {
                    getNewMessageNum(item.subCategoryList);
                }
            });
        };

        getMessageNum(vmodel.categories);

        service.bindViewModel('getCategories', vmodel);
        vmodel.$watch('categories', function(categories) {
            getMessageNum(categories);
        });

        if (!vmodel.hasError) {
            showMessage(me, {
                categoryId: vmodel.categoryId,
                status: util.queryToJson(window.location.search).status,
                tagId: util.queryToJson(window.location.search).tagId,
                subCategoryId: util.queryToJson(window.location.search).subCategoryId
            });
        }

        calculateUserListHeight();

        var targetCategory = +util.queryToJson(window.location.search).categoryId;
        if (targetCategory && targetCategory !== MANAGER_CATEGORY_ID) {
            var offsetTop = $('#' + targetCategory)[0].offsetTop;
            $('.message-tab-wrapper')[0].scrollTop = offsetTop;
        }
    };

    /**
     * 展示消息
     * @param  {Object} me         this ViewModel实例
     * @param  {Object} defaultParams 带入的参数
     */
    function showMessage(me, defaultParams) {
        var params = {
            categoryId: me.vmodel.categories[0].id,
            status: 0,
            tagId: 0,
            page: 1,
            subCategoryId: 0
        };
        for (var key in defaultParams) {
            if (defaultParams[key]) {
                params[key] = defaultParams[key];
            }
        }

        me.loadViewModel({
            container: 'message-main',
            ViewModel: require('mccShow/list/main'),
            params: params
        }, function(vm) {
            vm.$watch('numChange', function(categoryId) {
                getNewMessageNum([{id:categoryId}]);
            });
            calculateUserListHeight();
            vm.$watch('reloaded', function() {
                window.setTimeout(function() {
                    calculateUserListHeight();
                }, 0);
            });
        });
    }

    function getNewMessageNum(users) {
        var groupLimit = 20;
        var len = users.length;
        var groupList = [];
        var tempGroup = [];
        for (var i = 0; i < len; i ++) {
            if ((i !== 0) && ((i % groupLimit) === 0)) {
                groupList.push(tempGroup);
                tempGroup = [];
            }

            tempGroup.push(users[i].id);

            if (i === len - 1) {
                groupList.push(tempGroup);
            }
        }

        _.each(groupList, function(groupItem, index) {
            setTimeout(function() {
                $.request('getNewMessageNum', {categories: groupItem}).then(
                    function(res) {
                        var numInfoList = res.data;
                        _.each(numInfoList, function(item) {
                            $('#' + item.id + ' .new-message-num-wrapper').html(
                                (item.msgNum > 0)
                                ? ('<span class="new-message-num">' + item.msgNum + '</span>')
                                : ''
                            );
                        });
                    }
                );
            }, index * 1000);
        });
    }

    function calculateUserListHeight() {
        $('.message-tab-wrapper').css('height', ($('#message-main').height() - 130) + 'px');
    }

    return ViewModel;
});