/**
 * @file 获取mcc管理员所管辖账户的消息列表
 */
'use strict';
exports.index = function(params) {
    var params = JSON.parse(params.params);
    var res = {
        status: 200,
        data: {
            pageNum: (Math.random() > 0.5) ? 31 : 1,
            currentPage: 1,
            tags: null,
            currentTagId: 23,
            status: [
                {
                    id: 0,
                    name: '全部'
                },
                {
                    id: 1,
                    name: '未读'
                },
                {
                    id: 2,
                    name: '已读'
                }
            ],
            currentStatus: 0,
            subCategoryList: [
                {
                    id: 2,
                    name: '全部消息'
                },
                {
                    id: 0,
                    name: '账户消息'
                },
                {
                    id: 432,
                    name: '公告'
                },
                {
                    id: 13,
                    name: '搜索推广'
                },
                {
                    id: 12,
                    name: '网盟推广'
                }
            ],
            currentSubCategoryId: params.subCategoryId,
            list: [
                {
                    msgId: '1',
                    date: '2014-07-17',
                    time: '12:30',
                    status: 2,
                    statusName: '已读',
                    msgText: ' 您上一年度的实名认证服务将在2014-11-16到期，需要在到期前30天内提出申请,百度实名认证手续费600元/年。希望您可以在此期间尽快完成资质年度审核，提升可信赖度。',
                    linkText: '知道了',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    readOnly: true,
                    typeid: '12',
                    categoryName: '账户消息'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '12',
                    categoryName: '公告'
                },
                {
                    msgId: '5',
                    date: '2014-07-12',
                    time: '11:30',
                    status: 1,
                    statusName: '未读',
                    msgText: ' 手机版两周年献礼，ipad mini、红米手机、充值卡等你拿，快来攒金币抽大奖咯！了解更多，请参见',
                    linkText: '这里',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    productName: '搜索推广',
                    typeid: '12',
                    categoryName: '搜索推广'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '123',
                    categoryName: '账户消息'
                },
                {
                    msgId: '1',
                    date: '2014-07-17',
                    time: '12:30',
                    status: 2,
                    statusName: '已读',
                    msgText: ' 您上一年度的实名认证服务将在2014-11-16到期，需要在到期前30天内提出申请,百度实名认证手续费600元/年。希望您可以在此期间尽快完成资质年度审核，提升可信赖度。',
                    linkText: '知道了',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    readOnly: true,
                    typeid: '12',
                    categoryName: '账户消息'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '12',
                    categoryName: '公告'
                },
                {
                    msgId: '5',
                    date: '2014-07-12',
                    time: '11:30',
                    status: 1,
                    statusName: '未读',
                    msgText: ' 手机版两周年献礼，ipad mini、红米手机、充值卡等你拿，快来攒金币抽大奖咯！了解更多，请参见',
                    linkText: '这里',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    productName: '搜索推广',
                    typeid: '12',
                    categoryName: '搜索推广'
                },
                {
                    msgId: '5',
                    date: '2014-07-12',
                    time: '11:30',
                    status: 1,
                    statusName: '未读',
                    msgText: ' 手机版两周年献礼，ipad mini、红米手机、充值卡等你拿，快来攒金币抽大奖咯！了解更多，请参见',
                    linkText: '这里',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    productName: '搜索推广',
                    typeid: '12',
                    categoryName: '搜索推广'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '123',
                    categoryName: '账户消息'
                },
                {
                    msgId: '1',
                    date: '2014-07-17',
                    time: '12:30',
                    status: 2,
                    statusName: '已读',
                    msgText: ' 您上一年度的实名认证服务将在2014-11-16到期，需要在到期前30天内提出申请,百度实名认证手续费600元/年。希望您可以在此期间尽快完成资质年度审核，提升可信赖度。',
                    linkText: '知道了',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    readOnly: true,
                    typeid: '12',
                    categoryName: '账户消息'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '12',
                    categoryName: '公告'
                },
                {
                    msgId: '5',
                    date: '2014-07-12',
                    time: '11:30',
                    status: 1,
                    statusName: '未读',
                    msgText: ' 手机版两周年献礼，ipad mini、红米手机、充值卡等你拿，快来攒金币抽大奖咯！了解更多，请参见',
                    linkText: '这里',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    productName: '搜索推广',
                    typeid: '12',
                    categoryName: '搜索推广'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '12',
                    categoryName: '公告'
                },
                {
                    msgId: '5',
                    date: '2014-07-12',
                    time: '11:30',
                    status: 1,
                    statusName: '未读',
                    msgText: ' 手机版两周年献礼，ipad mini、红米手机、充值卡等你拿，快来攒金币抽大奖咯！了解更多，请参见',
                    linkText: '这里',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    productName: '搜索推广',
                    typeid: '12',
                    categoryName: '搜索推广'
                },
                {
                    msgId: '3',
                    date: '2014-07-19',
                    time: '12:43',
                    status: 2,
                    statusName: '已读',
                    msgText: '您提交的注册信息与资质文件通过审核。',
                    linkText: '快看好消息',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    readOnly: false,
                    linkAhead: true,
                    typeid: '12',
                    categoryName: '公告'
                },
                {
                    msgId: '5',
                    date: '2014-07-12',
                    time: '11:30',
                    status: 1,
                    statusName: '未读',
                    msgText: ' 手机版两周年献礼，ipad mini、红米手机、充值卡等你拿，快来攒金币抽大奖咯！了解更多，请参见',
                    linkText: '这里',
                    linkUrl: 'http://baidu.com',
                    categoryId: '2',
                    tagName: '紧急',
                    productName: '搜索推广',
                    typeid: '12',
                    categoryName: '搜索推广'
                }
            ]
        },
        errorCode: null
    };

    var random = Math.floor(10*Math.random());
    for (var i = 0; i < random; i ++) {
        res.data.list.pop();
    }

    return res;
};