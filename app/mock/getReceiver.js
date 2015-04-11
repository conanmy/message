/**
 * 获取联系人列表
 */
'use strict';
exports.index = function() {
    var res = {
        status: 200,
        data: [{
            product: {},
            mail: 'ga***m',
            phone: '',
            alias: '',
            contactid: null
        }, {
            product: {},
            mail: 'ga***m',
            phone: '186*****721',
            alias: '',
            contactid: 1000522
        }, {
            product: {
                3: 0,
                5: 0,
                223: 1
            },
            mail: 'ga***m11111',
            phone: '186*****721',
            alias: '',
            contactid: 1000523
        }, {
            product: {
                3: 1,
                5: 1
            },
            mail: 'ga***m22222',
            phone: '186*****721',
            alias: '',
            contactid: 1000524
        }],
        errorCode: null
    };

    return res;
};