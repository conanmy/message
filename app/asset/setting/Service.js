/*
 * @file 消息设置页面获取信息接口
 *
 * @author Skyline Yu(yutianxiang@baidu.com)
 */
define(function(require) {
    'use strict';
    var Service = require('avalonFrame/Service').derive();
    var $ = require('jquery');
    var _ = require('underscore');
    var config = require('./config');
    var comConfig = require('common/config');

    function translateProductMap(product, allProducts) {
        var result = {};
        _.each(product, function(val, key) {
            if ($.inArray(+key, allProducts) === -1) {
                return;
            }
            result[key] = !!val ? '1' : '0';
        });
        return result;
    }

    function translateSetting(options) {
        var map = config.typeids;
        options = options.sort(function(a, b) {
            return map[a.typeid].sort - map[b.typeid].sort;
        });
        return _.map(options, function(item) {
            item.options = item.options.toString(2);
            item.options = item.options.length > 3 ? item.options.substr(item.options.length - 3, 3) : item.options;
            item.options = parseInt(item.options, 2);
            //分别取二进制最后三位作为是否勾选的判断依据
            var info = {
                typeid: item.typeid,
                value: item.value,
                inbox: {
                    disabled: $.inArray(item.typeid, config.disabledInbox) !== -1,
                    checked: !!(item.options & 1)
                },
                sms: {
                    disabled: $.inArray(item.typeid, config.disabledSms) !== -1,
                    checked: !!(item.options & 2)
                },
                mail: {
                    disabled: $.inArray(item.typeid, config.disabledMail) !== -1,
                    checked: !!(item.options & 4)
                }
            };
            if (map[info.typeid].type === 'plan') {
                info.value = info.value || '';
                info.value = info.value.split(',');
                info.value = info.value[0] === '' ? [] : info.value;
            }
            $.extend(true, info, map[info.typeid]);
            // 保留一份旧值做修改时判断，如无需要后续再给删了就行
            info.$oldInfo = $.extend(true, {}, item);
            return info;
        });
    }

    Service.prototype.interface = {
        getAccountInfo: function() {
            return $.request('accountTypeIds').then(function(res) {
                return res.data;
            }).then(function(list) {
                return $.request('list', {
                    typeids: list
                });
            }).then(function(res) {
                return {
                    hasError: false,
                    options: translateSetting(res.data.options)
                };
            }, function() {
                return {
                    hasError: true
                };
            });
        },
        getSyncInfo: function() {
            return $.request('getPlatform', {
                sync: [{
                    from: 1,
                    to: 0
                }, {
                    from: 2,
                    to: 0
                }]
            }).then(function(res) {
                return {
                    hasError: false,
                    phone: res.data.sync[0].value,
                    client: res.data.sync[1].value
                };
            }, function() {
                return {
                    hasError: true
                };
            });
        },
        getProductInfo: function(appid) {
            var result;
            return $.request('productTypeIds', {
                appid: appid
            }).then(function(res) {
                return res.data;
            }).then(function(list) {
                return $.request('list', {
                    typeids: list
                });
            }).then(function(res) {
                result = {
                    hasError: false,
                    options: translateSetting(res.data.options)
                };
                var hasPlan = _.some(result.options, function(item) {
                    return config.typeids[item.typeid].type === 'plan';
                });
                if (!hasPlan) {
                    return hasPlan;
                }
                return $.request('plan', {
                    appid: appid
                });
            }).then(function(res) {
                if (!res) {
                    return result;
                }
                var planMap = {};
                _.each(res.data, function(item) {
                    planMap[item.plan_id] = item.plan_name;
                });
                result.$planMap = planMap;
                result.$plan = res.data;
                result.options = _.map(result.options, function(item) {
                    if (item.type !== 'plan') {
                        return item;
                    }
                    item.value = _.filter(item.value, function(planId) {
                        return planMap[planId];
                    });
                    item.$planMap = planMap;
                    return item;
                });
                return result;
            }, function() {
                return {
                    hasError: true
                };
            });
        },
        getReceiversInfo: function() {
            return $.request('getReceiver').then(function(res) {
                return _.map(res.data, function(receiver) {
                    var hasProduct = !!_.filter(receiver.product, function() {
                        return true;
                    }).length;
                    _.each(comConfig.productMap, function(val, key) {
                        receiver.product[key] = (+receiver.product[key]) || 0;
                        if (!receiver.contactid || !hasProduct) {
                            receiver.product[key] = 1;
                        }
                    });
                    receiver.$oldInfo = $.extend(true, {}, receiver);
                    receiver.isEditing = false;
                    receiver.aliasError = '';
                    receiver.phoneError = '';
                    receiver.mailError = '';
                    return receiver;
                });
            }, function() {
                return {
                    hasError: true
                };
            });
        },
        modReceiver: function(param) {
            var receiver = param.receiver;
            var allProducts = param.allProducts;
            var params = {};
            params.contactid = receiver.contactid || null;

            if (receiver.alias.indexOf('*') === -1) {
                params.alias = receiver.alias;
            }
            if (receiver.mail.indexOf('*') === -1) {
                params.mail = receiver.mail;
            }
            if (receiver.phone.indexOf('*') === -1) {
                params.phone = receiver.phone;
            }
            params.product = translateProductMap(receiver.product, allProducts);
            return $.request('modReceiver', params).then(function(res) {
                return res.data;
            });
        },
        addNewReceiver: function(params) {
            var receiver = params.receiver;
            var allProducts = params.allProducts;
            return $.request('addReceiver', {
                alias: receiver.alias,
                mail: receiver.mail,
                phone: receiver.phone,
                product: translateProductMap(receiver.product, allProducts)
            });
        },
        delReceiver: function(contactid) {
            return $.request('delReceiver', {
                contactid: contactid
            });
        },
        getProducts: function() {
            return $.request('appList').then(function(res) {
                var sortMap = comConfig.productMap;
                return res.data.sort(function(a, b) {
                    return sortMap[a].sort - sortMap[b].sort;
                });
            }, function() {
                return {
                    hasError: true
                };
            });
        },
        getProductsSetting: function() {
            return $.request('selectApp').then(function(res) {
                var sortMap = comConfig.productMap;
                return res.data.sort(function(a, b) {
                    return sortMap[a].sort - sortMap[b].sort;
                });
            }, function(){
                return {
                    hasError: true
                };
            });
        },
        modSyncInfo: function(params) {
            return $.request('setPlatform', params);
        },
        modAccountInfo: function(params) {
            return $.request('set', params);
        },
        modProductInfo: function(params) {
            return $.request('set', params);
        }
    };
    return Service;
});