/*
 * @file 设置计划下线
 *
 * @author Skyline Yu(yutianxiang@baidu.com)
 */
define(function(require) {
    'use strict';
    var _ = require('underscore');
    var $ = require('jquery');
    var ViewModel = require('avalonFrame/ViewModel').derive();
    ViewModel.prototype.moduleId = 'plan';
    ViewModel.prototype.template = require('text!./index.html');
    ViewModel.prototype.datasource = function() {
        var params = arguments[1].params;
        var planMap = {};
        var allPlan = [];
        _.each(params.allPlan, function(value) {
            if ($.inArray(value.plan_id, params.nowPlan) === -1) {
                allPlan.push(value.plan_id);
            }
            planMap[value.plan_id] = value.plan_name;
        });

        return {
            inPlan: params.nowPlan,
            notInPlan: allPlan,
            $planMap: planMap
        };
    };

    ViewModel.prototype.initBehavior = function(vmodel) {
        vmodel.addPlan = function (plan, $remove){
            $remove();
            vmodel.inPlan.unshift(plan);
        };
        vmodel.removePlan = function (plan, $remove){
            $remove();
            vmodel.notInPlan.unshift(plan);
        };
        vmodel.confirm = function (){
            vmodel.$fire('changeSelect', $.makeArray(vmodel.$model.inPlan));
            vmodel.$fire('close');
        };
        vmodel.cancle = function() {
            vmodel.$fire('close');
        };
    };

    return ViewModel;
});