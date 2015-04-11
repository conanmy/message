'use strict';
exports.index = function() {
    var res = {
        data: [
            {
                id: '1',
                name: '账户消息',
                msgNum: Math.ceil(10*Math.random())
            },
            {
                id: '2',
                name: '系统消息',
                msgNum: 1
            },
            {
                id: '3',
                name: '产品消息',
                msgNum: 3,
                subCategoryList: [
                    {
                        id: '301',
                        name: '搜索推广'
                    }, {
                        id: '302',
                        name: '网盟推广'
                    }
                ]
            }
        ],
        status: 200
    };

    return res;
};