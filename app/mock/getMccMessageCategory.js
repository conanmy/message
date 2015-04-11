/**
 * @file 获取mcc管理员目录列表
 */
'use strict';
exports.index = function() {
    var res = {
        data: [
            {
                id: 1,
                name: '账户管家消息',
                msgNum: Math.ceil(10*Math.random())
            },
            {
                id: 2,
                name: '绑定账户',
                msgNum: 3,
                subCategoryList: [
                    {
                        name: 'searchlab',
                        id: '630152'
                    },
                    {
                        name: 'casqianqian',
                        id: '2075'
                    },
                    {
                        name: '内测内测内测啦啦啦啦啦阿拉蕾',
                        id: '100'
                    },
                    {
                        name: 'searchlaaaaaaab',
                        id: '30152'
                    },
                    {
                        name: 'casqian',
                        id: '75'
                    },
                    {
                        name: '内测01',
                        id: '1001'
                    },
                    {
                        name: 'searchlab',
                        id: '152'
                    },
                    {
                        name: 'casqian',
                        id: '752'
                    },
                    {
                        name: '内测01',
                        id: '10011'
                    },
                    {
                        name: 'searchlab',
                        id: '52'
                    },
                    {
                        name: 'casqian',
                        id: '5'
                    },
                    {
                        name: '内测01',
                        id: '11100'
                    },
                    {
                        name: 'searchlab',
                        id: '23630152'
                    },
                    {
                        name: 'casqian',
                        id: '12075'
                    },
                    {
                        name: '内测01',
                        id: '321002'
                    },
                    {
                        name: '内测01',
                        id: '341001'
                    },
                    {
                        name: 'searchlab',
                        id: '23201522'
                    },
                    {
                        name: 'casqian',
                        id: '12230752'
                    },
                    {
                        name: '内测01',
                        id: '10034547'
                    },
                    {
                        name: 'searchlab',
                        id: '1232015290'
                    },
                    {
                        name: 'casqian',
                        id: '2122307589'
                    },
                    {
                        name: '内测01',
                        id: '14400345478'
                    },
                    {
                        name: 'casqian',
                        id: '122307567'
                    },
                    {
                        name: '内测01',
                        id: '1003454123'
                    },
                    {
                        name: 'searchlab',
                        id: '12320152344'
                    },
                    {
                        name: 'casqian',
                        id: '2122307512'
                    },
                    {
                        name: '内测01',
                        id: '1440034543'
                    }
                ]
            }
        ],
        status: 200
    };

    return res;
};