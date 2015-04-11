'use strict';
exports.index = function(params) {
    var param = JSON.parse(params.params);
    var res = {
        status: 200,
        data: {
            options: [{
                typeid: 10000135,
                value: null,
                options: 23
            }, {
                typeid: 10000134,
                value: null,
                options: 23
            }, {
                typeid: 10000132,
                value: null,
                options: 23
            }, {
                typeid: 1000018,
                value: null,
                options: 23
            }, {
                typeid: 1000012,
                value: null,
                options: 23
            }, {
                typeid: 1000011,
                value: 0,
                options: 23
            }]
        },
        errorCode: null
    };
    if (param.typeids.indexOf('10000465') !== -1) {
        res.data.options = [{
            typeid: 10000465,
            value: 10,
            options: 23
        }, {
            typeid: 10000462,
            options: 23
        }, {
            typeid: 10000463,
            options: 21
        }, {
            typeid: 10000464,
            options: 21
        }, {
            typeid: 1000045,
            value: '11007868',
            options: 21
        }, {
            typeid: 10000466,
            value: '3',
            options: 21
        }];
    }
    if (param.typeids.indexOf('1000065') !== -1) {
        res.data.options = [{
            typeid: 10000675,
            options: 21,
            value: '1.123'
        }, {
            typeid: 1000065,
            options: 23
        }];
    }
    if (param.typeids.indexOf('10000131') !== -1) {
        res.data.options = [{
            typeid: 10000131,
            value: '20',
            options: 23
        }, {
            typeid: 10000123,
            value: null,
            options: 26
        }, {
            typeid: 1000015,
            value: '19995453,20124868,20147734',
            options: 29
        }, {
            typeid: 1000014,
            value: null,
            options: 27
        }, {
            typeid: 1000013,
            value: '01.22',
            options: 28
        }, {
            typeid: 1000016,
            value: null,
            options: 21
        }];
    }

    return res;
};