"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var assert_1 = tslib_1.__importDefault(require("assert"));
var validator_1 = require("oak-domain/lib/utils/validator");
var checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'parasite',
        checker: function (data, context) {
            // const { data } = operation as EntityDict['parasite']['Create'];
            (0, assert_1.default)(!(data instanceof Array));
            (0, validator_1.checkAttributesNotNull)('parasite', data, ['expiresAt', 'tokenLifeLength']);
            if (data.userId) {
                var users2 = context.select('user', {
                    data: {
                        id: 1,
                        userState: 1,
                    },
                    filter: {
                        id: data.userId,
                    },
                }, { dontCollect: true });
                var checkUser_1 = function (users) {
                    var _a;
                    var _b = tslib_1.__read(users, 1), user = _b[0];
                    if (user.userState !== 'shadow') {
                        throw new types_1.OakRowInconsistencyException({
                            a: 's',
                            d: {
                                user: (_a = {},
                                    _a[user.id] = user,
                                    _a),
                            },
                        });
                    }
                };
                if (users2 instanceof Promise) {
                    return users2.then(function (u) { return checkUser_1(u); });
                }
                return checkUser_1(users2);
            }
            (0, assert_1.default)(data.user && data.user.action === 'create');
        },
    },
    {
        type: 'row',
        entity: 'parasite',
        action: ['cancel'],
        errMsg: '您没有设置失效的权限',
        filter: {
            expired: false,
        },
    },
    {
        type: 'row',
        entity: 'parasite',
        action: ['qrcode'],
        errMsg: '您没有查看二维码的权限',
        filter: {
            expired: false,
        },
    },
];
exports.default = checkers;
