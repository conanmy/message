/**
 * @file 系统配置项
 */
define(function() {
    'use strict';

    var config = {};

    config.CHENGXIN_REGID = 223;  // 全网认证产品的标识

    config.productMap = {
        3: {
            name: '搜索推广',
            sort: 0
        },
        5: {
            name: '网盟推广',
            sort: 5
        },
        29: {
            name: '鸿媒体',
            sort: 10
        },
        33: {
            name: '品牌植入',
            sort: 15
        },
        34: {
            name: '移动网盟推广',
            sort: 20
        },
        196: {
            name: '移动应用推广',
            sort: 25
        },
        168: {
            name: '品牌起跑线',
            sort: 30
        },
        190: {
            name: '游戏推广',
            sort: 35
        },
        195: {
            name: '教育推广',
            sort: 40
        },
        193: {
            name: '医疗推广',
            sort: 45
        },
        228: {
            name: '金融推广',
            sort: 50
        },
        194: {
            name: '企业之窗',
            sort: 55
        },
        208: {
            name: '品牌专区',
            sort: 60
        },
        218: {
            name: 'Hao123点金推广',
            sort: 65
        },
        249: {
            name: '企业百科',
            sort: 70
        },
        251: {
            name: '特卖推广',
            sort: 75
        },
        244: {
            name: 'DSP',
            sort: 80
        },
        260: {
            name: '品牌地标',
            sort: 85
        },
        255: {
            name: '全球推广',
            sort: 90
        },
        266: {
            name: '电商推广',
            sort: 95
        },
        278: {
            name: '医药推广',
            sort: 100
        },
        223: {
            name: '百度全网认证',
            sort: 105
        }
    };

    return config;
});