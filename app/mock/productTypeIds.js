/**
 * 获取产品线设置模板信息
 */
'use strict';
exports.index = function(params) {
    params = JSON.parse(params.params);
    var res = {
        'status': 200,
        'data': ['1000012', '1000011', '1000018', '10000132', '10000134', '10000135'],
        'errorCode': null
    };
    if (+params.appid === 195) {
        res.data = ['10000463', '10000466', '10000462', '1000045', '10000464', '10000465'];
    }
    if (+params.appid === 5) {
        res.data = ['1000065', '10000675'];
    }
    if(+params.appid === 3){
        res.data = ['1000013', '1000014', '1000015', '1000016', '10000123', '10000131'];
    }
    return res;
};