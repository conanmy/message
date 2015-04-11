/**
 * 获取平台同步信息接口
 */
'use strict';
exports.index = function() {
    var res = {
        status: 200,
        data: {
            sync: [{
                userid: 630152,
                from: 1,
                to: 0,
                value: 1
            }, {
                userid: 630152,
                from: 2,
                to: 0,
                value: 0
            }]
        },
        errorCode: null
    };

    return res;
};