/**
 * @file 获取mcc管理员目录列表
 */
'use strict';
exports.index = function(params) {
    var res = {
        data: [],
        status: 200
    };

    var params = JSON.parse(params.params);
    var category = params.categories;
    var len = category.length;
    for (var i = 0; i < len; i ++) {
        res.data.push({id:category[i], msgNum: Math.floor(10*Math.random())});
    }

    return res;
};