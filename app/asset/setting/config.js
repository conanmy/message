/*
 * @file 消息设置配置文件
 *
 * @author Skyline Yu(yutianxiang@baidu.com)
 */
define(function() {
    'use strict';
    var config = {
        typeids: {
            // 账户消息
            1000012: {
                words: ['余额为零'],
                sort: 0,
                type: 'word',
                helpId: null
            },
            1000011: {
                type: 'select',
                words: ['余额低于', '元'],
                sort: 5,
                values: [{
                    val: '0',
                    text: '智能阀值'
                }, {
                    val: '10',
                    text: 10
                }, {
                    val: '20',
                    text: 20
                }, {
                    val: '30',
                    text: 30
                }, {
                    val: '50',
                    text: 50
                }, {
                    val: '100',
                    text: 100
                }, {
                    val: '200',
                    text: 200
                }, {
                    val: '500',
                    text: 500
                }, {
                    val: '1000',
                    text: 1000
                }, {
                    val: '5000',
                    text: 5000
                }, {
                    val: '10000',
                    text: 10000
                }, {
                    val: '20000',
                    text: 20000
                }],
                helpId: 1
            },
            1000018: {
                words: ['注册信息、资质审核结果、资质到期信息'],
                sort: 10,
                type: 'word',
                helpId: null
            },
            10000132: {
                words: ['账户被绑定或被解绑定'],
                sort: 15,
                type: 'word',
                helpId: null
            },
            10000134: {
                words: ['积分抽奖活动、优惠活动资讯'],
                sort: 20,
                type: 'word',
                helpId: null
            },
            10000135: {
                words: ['参与活动过程的各类信息提示，如抽奖订单填写、礼品兑换失败等'],
                sort: 25,
                type: 'word',
                helpId: null
            },
            // 教育推广
            10000462: {
                words: ['审核类：机构审核通过消息'],
                sort: 0,
                type: 'word',
                helpId: null
            },
            10000463: {
                words: ['审核类：机构审核拒绝消息'],
                sort: 5,
                type: 'word',
                helpId: 2
            },
            10000464: {
                words: ['审核类：课程审核拒绝消息'],
                sort: 10,
                type: 'word',
                helpId: 3
            },
            1000045: {
                words: ['优化类：计划下线', '重点计划到达预算下线', '等重点计划到达预算下线', '达到预算下线'],
                type: 'plan',
                sort: 15,
                helpId: 4
            },
            10000466: {
                words: ['商机类：验证，您有X个订单再过', '天即将过期'],
                type: 'select',
                sort: 20,
                values: [{
                    val: '1',
                    text: 1,
                }, {
                    val: '2',
                    text: 2,
                }, {
                    val: '3',
                    text: 3,
                }],
                helpId: 5
            },
            10000465: {
                words: ['商机类：预约，新增', '个预约单'],
                type: 'select',
                sort: 25,
                values: [{
                    val: '1',
                    text: 1,
                }, {
                    val: '2',
                    text: 2,
                }, {
                    val: '3',
                    text: 3,
                }, {
                    val: '4',
                    text: 4,
                }, {
                    val: '5',
                    text: 5,
                }, {
                    val: '6',
                    text: 6,
                }, {
                    val: '7',
                    text: 7,
                }, {
                    val: '8',
                    text: 8,
                }, {
                    val: '9',
                    text: 9,
                }, {
                    val: '10',
                    text: 10
                }],
                helpId: 6
            },
            // 网盟
            1000065: {
                words: ['消费类：推广计划下线'],
                sort: 0,
                type: 'word',
                helpId: null
            },
            10000675: {
                words: ['消费类：消费突增 / 突降', '%'],
                type: 'input',
                sort: 5,
                rule: /^(?:[1-9][0-9]?|100)$/,
                errorTip: '数值应是1-100之间的整数。',
                helpId: null
            },
            // 凤巢
            1000013: {
                words: ['消费类：账户当日消费', '元'],
                type: 'input',
                sort: 0,
                rule: /^\d+(\.\d{1,2})?$/,
                errorTip: '小数点后不能超过两位。',
                helpId: null
            },
            1000014: {
                words: ['消费类：账户到达预算下线'],
                sort: 5,
                type: 'word',
                helpId: null
            },
            1000015: {
                words: ['消费类：计划当日消费', '重点计划到达预算下线', '等重点计划到达预算下线', '达到预算下线'],
                type: 'plan',
                sort: 10,
                helpId: null
            },
            1000016: {
                words: ['优化类：账户推广效果突降'],
                sort: 15,
                type: 'word',
                helpId: null
            },
            10000123: {
                words: ['优化类：重点关键词预算不足/不在左侧/质量度过低/排名下降/搜索无效/搜索量过低'],
                sort: 21,
                type: 'word',
                helpId: null
            },
            10000131: {
                words: ['优化类：账户点击量在行业中的排名突降', '名'],
                type: 'select',
                sort: 25,
                values: [{
                    val: '20',
                    text: 20
                }, {
                    val: '30',
                    text: 30
                }, {
                    val: '40',
                    text: 40
                }, {
                    val: '50',
                    text: 50
                }],
                helpId: null
            }
        },
        disabledInbox: [1000012, 1000018, 10000462, 10000463, 1000045, 10000466, 1000016, 10000123, 10000131],
        disabledSms: [10000123],
        disabledMail: [1000012, 1000018, 10000123, 10000132],
        allowSetting: [3, 5, 195]
    };
    return config;
});