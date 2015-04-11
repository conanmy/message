/*
 * @file 消息设置模块
 *
 * @author Skyline Yu(yutianxiang@baidu.com)
 */
define(function(require) {
    'use strict';
    var env = require('common/env');
    var comConfig = require('common/config');
    var config = require('./config');
    var $ = require('jquery');
    var _ = require('underscore');
    var util = require('common/util');
    var bizLog = require('common/extension/log');

    var Modal = require('commonUI/Modal');
    var requestPipe = require('common/requestPipe');
    require('bootstrap-popover');

    var ViewModel = require('avalonFrame/ViewModel').derive();

    function translateMail(mail) {
        return mail[0] + mail[1] + '***' + mail[mail.length - 1];
    }

    function translatePhone(phone) {
        return phone[0] + phone[1] + phone[2] + '*****' + phone[phone.length - 3] + phone[phone.length - 2] + phone[phone.length - 1];
    }

    function tranlateCheckOption(option) {
        option = '' + (+option.mail.checked) + (+option.sms.checked) + (+option.inbox.checked);
        return parseInt(option, 2);
    }

    function translateAlias(alias) {
        if (!alias.length) {
            return '';
        }
        return alias[0] + alias.substr(1).replace(/./g,'*');
    }

    ViewModel.prototype.moduleId = 'setting';
    ViewModel.prototype.template = require('text!./index.html');
    ViewModel.prototype.service = require('./Service');
    ViewModel.prototype.beforeenter = function() {
        var target = $('#main-tab-setting');
        target.siblings().removeClass('active');
        target.addClass('active');
    };
    ViewModel.prototype.datasource = function(service) {
        this.appid = +env.get('appid');
        var appid = +env.get('appid') || 3;
        appid = $.inArray(appid, config.allowSetting) === -1 ? 3 : appid;
        env.set('appid', '');
        var datasource = {
            receivers: service.runService('getReceiversInfo'),
            newReceiver: {
                alias: '',
                mail: '',
                phone: '',
                product: {},
                isEditing: false,
                aliasError: '',
                phoneError: '',
                mailError: ''
            },
            $products: service.runService('getProducts'),
            $productInfoMap: comConfig.productMap,
            $productsSetting: service.runService('getProductsSetting')
        };

        if (env.get('optregappid') !== comConfig.CHENGXIN_REGID) {
            datasource.isChengxinUser = false;
            datasource.sync = service.runService('getSyncInfo');
            datasource.accounts = service.runService('getAccountInfo');
            datasource.products = service.runService('getProductInfo', appid);
            datasource.nowProduct = appid;
        } else {
            datasource.isChengxinUser = true;
        }

        return datasource;
    };
    ViewModel.prototype.initBehavior = function(vmodel, service) {
        vmodel.receivers = vmodel.$products.hasError ? {hasError: true} : vmodel.receivers;
        var me = this;

        _.each(vmodel.$products, function(appid) {
            vmodel.newReceiver.product[appid] = 1;
        });
        vmodel.testAlias = function(receiver) {
            var alias = receiver.alias;
            if (util.getGBKLength(alias) > 24) {
                receiver.aliasError = '内容超长';
                return false;
            }
            receiver.aliasError = '';
            return true;
        };
        vmodel.testMail = function(receiver) {
            var testMail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            var mail = receiver.mail;
            if (!$.trim(mail).length) {
                receiver.mailError = '邮箱不能为空';
                return false;
            }
            if (!testMail.test(mail) || util.getGBKLength(mail).length > 200) {
                receiver.mailError = '邮箱填写有误';
                return false;
            }
            receiver.mailError = '';
            return true;
        };
        vmodel.testPhone = function(receiver) {
            var phone = receiver.phone;
            if (!$.trim(phone).length) {
                receiver.phoneError = '手机号码不能为空';
                return false;
            }
            if (!/^\d{11}$/g.test(phone)) {
                receiver.phoneError = '手机号码为11位数字';
                return false;
            }
            receiver.phoneError = '';
            return true;
        };
        vmodel.showAuth = function() {
            var dialog = new Modal({
                title: '授权声明',
                content: '您授权上述手机号码持有人通过短信平台进行推广账户信息查询、推广账户预算调整、推广账户设置操作，您知悉使用短信平台服务存在手机保管不善，被他人盗用的风险，对此百度不承担任何责任。百度推广的手机操作地址均以sj.baidu.com开头，请您注意识别。',
                size: 'small',
                onClose: function() {
                    dialog.dispose();
                }
            });
            dialog.show();
        };

        vmodel.modReceiver = function(receiver) {
            receiver.isEditing = true;
            // 单独判断一遍是否为空，防止提交空数据，针对email与phone
            if (!$.trim(receiver.phone).length) {
                receiver.phoneError = '手机号码不能为空';
            }
            if (!$.trim(receiver.mail).length) {
                receiver.mailError = '邮箱不能为空';
                return false;
            }
        };

        vmodel.cancleReceiver = function(receiver) {
            receiver.isEditing = false;
            $.extend(true, receiver, receiver.$oldInfo);
        };

        vmodel.saveReceiver = function(receiver) {
            if (receiver.aliasError
                || receiver.phoneError
                || receiver.mailError
            ){
                return;
            }
            service.runService('modReceiver', {
                receiver: receiver.$model,
                allProducts: vmodel.$products
            }).done(function(contactid) {
                receiver.contactid = contactid;
                receiver.phone = translatePhone(receiver.phone);
                receiver.mail = translateMail(receiver.mail);
                receiver.alias = translateAlias(receiver.alias);
                receiver.isEditing = false;
                receiver.aliasError = '';
                receiver.phoneError = '';
                receiver.mailError = '';
                receiver.$oldInfo.alias = receiver.alias;
                receiver.$oldInfo.mail = receiver.mail;
                receiver.$oldInfo.phone = receiver.phone;
                receiver.$oldInfo.product = $.extend(true, {}, receiver.$model.product);
            
                bizLog.send({
                    target: 'setting',
                    subTarget: 'update-contact'
                });
            });
        };

        vmodel.delReceiver = function(receiver) {
            if (vmodel.receivers.length <= 1) {
                return;
            }
            service.runService('delReceiver', receiver.contactid).done(function() {
                vmodel.receivers = _.filter(vmodel.$model.receivers, function(item) {
                    return item.contactid !== receiver.contactid;
                });
                bizLog.send({
                    target: 'setting',
                    subTarget: 'delete-contact'
                });
            });
        };

        vmodel.addNewReceiver = function() {
            vmodel.newReceiver.isEditing = true;
        };

        vmodel.cancleNewReceiver = function() {
            vmodel.newReceiver.isEditing = false;
        };

        vmodel.saveNewReceiver = function(newReceiver) {
            var canMod = true;
            canMod = vmodel.testAlias(newReceiver) && canMod;
            canMod = vmodel.testMail(newReceiver) && canMod;
            canMod = vmodel.testPhone(newReceiver) && canMod;
            if (!canMod) {
                return;
            }
            service.runService('addNewReceiver', {
                receiver: newReceiver.$model,
                allProducts: vmodel.$products
            }).done(function(res) {
                var receiver = {
                    product: $.extend(true, {}, newReceiver.$model.product),
                    mail: translateMail(newReceiver.mail),
                    phone: translatePhone(newReceiver.phone),
                    alias: translateAlias(newReceiver.alias),
                    contactid: res.data,
                    aliasError: '',
                    phoneError: '',
                    mailError: ''
                };
                receiver.$oldInfo = $.extend(true, {}, receiver);
                receiver.isEditing = false;
                vmodel.receivers.push(receiver);

                newReceiver.alias = '';
                newReceiver.mail = '';
                newReceiver.phone = '';
                _.each(vmodel.$products, function(appid) {
                    newReceiver.product[appid] = 1;
                });
                newReceiver.isEditing = false;

                bizLog.send({
                    target: 'setting',
                    subTarget: 'add-contact'
                });
            });
        };

        vmodel.setPlan = function(product) {
            var dialog = new Modal({
                title: '设置到达预算下线计划提醒',
                onClose: function (){
                    dialog.dispose();
                }
            });
            var div = document.createElement('div');
            me.loadViewModel({
                container: div,
                ViewModel: require('setting/plan/index'),
                params: {
                    allPlan: $.makeArray(vmodel.products.$plan),
                    nowPlan: $.makeArray(product.$model.value)
                }
            }, function(vm) {
                dialog.setContent(div);
                avalon.scan();
                vm.$watch('close', function() {
                    dialog.hide();
                });
                vm.$watch('changeSelect', function(inPlan) {
                    product.value = inPlan;
                });
            });
            dialog.show();
        };

        vmodel.saveSetting = function() {
            /**
             * 发送接收方式修改的监控
             * @param  {Object} item 设置项对象
             */
            var logSettingChange = function(item) {
                // 补足三位
                var patchup = function(str) {
                    var newStr = str;
                    for (var j = 0; j < (3 - str.length); j++) {
                        newStr = '0'.concat(newStr);
                    }
                    return newStr;
                };
                var oldInfo = patchup(item.$oldInfo.options.toString(2));
                var newInfo = patchup(tranlateCheckOption(item).toString(2));
                if (oldInfo != newInfo) {
                    var len = oldInfo.length;
                    for (var i = 0; i < len; i++) {
                        if (oldInfo.charAt(i) != newInfo.charAt(i)) {
                            console.log(oldInfo + '->' + newInfo + 'at' + i);
                            bizLog.send({
                                target: 'setting',
                                subTarget: ['remove', 'add'][+newInfo.charAt(i)] + '-receive-method-' + i,
                                typeid: (item.typeid + '').substring(6)
                            });
                        }
                    }
                }
            };
            
            var changedParamsAccount = getChangeParams(vmodel.$model.accounts.options);
            var modAccount = changedParamsAccount.length > 0 ? service.runService('modAccountInfo', {
                data: changedParamsAccount
            }).done(function(){
                vmodel.accounts.options = _.map(vmodel.$model.accounts.options, function(item){
                    logSettingChange(item);
                    item.$oldInfo.options = tranlateCheckOption(item);
                    item.$oldInfo.value = item.value;
                    return item;
                });

                _.each(changedParamsAccount, function(item) {
                    if (item.typeid) {
                        bizLog.send({
                            target: 'setting',
                            subTarget: 'change-receive-method-' + item.typeid
                        });
                    }
                });
            }) : true;

            var hasSyncInfo = vmodel.sync.phone !== undefined && vmodel.sync.client !== undefined;

            var modSync = hasSyncInfo ? service.runService('modSyncInfo', {
                sync: [{
                    from: 1,
                    to: 0,
                    value: +vmodel.sync.phone
                }, {
                    from: 2,
                    to: 0,
                    value: +vmodel.sync.client
                }]
            }) : true;

            var changedParamsProduct = getChangeParams(vmodel.$model.products.options);

            var modProduct = changedParamsProduct.length > 0 ? service.runService('modProductInfo', {
                data: changedParamsProduct
            }).done(function(){
                vmodel.products.options = _.map(vmodel.$model.products.options, function(item){
                    logSettingChange(item);
                    item.$oldInfo.options = tranlateCheckOption(item);
                    item.$oldInfo.value = $.type(item.value) === 'array' ? item.value.join(',') : item.value;
                    return item;
                });

                _.each(changedParamsProduct, function(item) {
                    if (item.typeid) {
                        bizLog.send({
                            target: 'setting',
                            subTarget: 'change-receive-method-' + item.typeid
                        });
                    }
                });
            }): true;
            $.when(modAccount, modSync, modProduct).done(function() {
                var alert = new Modal({
                    title: '提醒',
                    content: '保存设置成功',
                    type: 'alert'
                });
                alert.show();
            }).fail(function() {
                var alert = new Modal({
                    title: '提醒',
                    content: '保存设置失败',
                    type: 'alert'
                });
                alert.show();
            });
        };
    };

    function getChangeParams(options) {
        options = options || [];
        var params = _.map(options, function(option) {
            return {
                typeid: option.typeid,
                value: option.value,
                options: tranlateCheckOption(option)
            };
        });
        var changedParams = [];
        _.each(options, function(value, index) {
            var hasChanged = false;

            _.each(value.$oldInfo, function(val, key) {
                if (key === 'value' && value.type === 'plan') {
                    val = val || '';
                    val = val.split(',').sort().join(',');
                    params[index][key] = params[index][key].sort().join(',');
                }
                if (val !== params[index][key]) {
                    hasChanged = true;
                }
            });
            if (hasChanged) {
                changedParams.push(params[index]);
            }
        });
        return changedParams;
    }

    function setSaveStatus() {
        if ($('.error-tip:visible').length) {
            $('#save-setting').attr('disabled','disabled');
        } else {
            $('#save-setting').removeAttr('disabled');
        }
    }

    function setActionBar() {
        setTimeout(function() {
            setBarPosition();
            $(window)
                .off('scroll.setting')
                .on('scroll.setting', setBarPosition);
            setSaveStatus();
        }, 10);

        function setBarPosition() {
            var settingActions = $('#setting-actions');
            var height = settingActions.offset().top + settingActions.height();
            var top = $(window).height() + $(window).scrollTop();
            if (height > top && !settingActions.find('p').hasClass('fixed')) {
                settingActions.find('p').addClass('fixed');
            } else if (height <= top && settingActions.find('p').hasClass('fixed')) {
                settingActions.find('p').removeClass('fixed');
            }
        }
    }

    function setHelp(){
        setTimeout(function (){
            $('[data-action="popover"]').popover({
                content: function() {
                    var me = this;
                    requestPipe.request('word', {
                        id: me.$element.data('id')
                    }).done(function(res) {
                        me.setContent(res.data);
                    });
                    return '加载中……';
                }
            });
        }, 10);
    }

    ViewModel.prototype.entercomplete = function(vmodel, service) {
        service.bindViewModel('getProductInfo', vmodel, 'products');
        service.bindViewModel('getAccountInfo', vmodel, 'accounts');

        if ($.inArray(this.appid, config.allowSetting) !== -1) {
            $(window).scrollTop(800);
        }

        vmodel.$watch('nowProduct', function(value) {
            service
                .runService('getProductInfo', value)
                .done(setActionBar)
                .done(setHelp);
            bizLog.send({
                target: 'setting',
                subTarget: 'change-catalog',
                product: value
            });
        });

        $('.setting-product')
            .on('keyup', 'input.text', setSaveStatus)
            .on('keydown', 'input.text', setSaveStatus);

        setHelp();
        setActionBar();
    };
    ViewModel.prototype.beforeleave = function() {
        $(window).off('scroll.setting');
    };
    return ViewModel;
});