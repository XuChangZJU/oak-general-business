"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var assert_1 = tslib_1.__importDefault(require("assert"));
var checkers = [
    {
        type: 'logical',
        action: 'create',
        entity: 'parasite',
        checker: function (operation, context, option) {
            var data = operation.data;
            (0, assert_1.default)(!(data instanceof Array));
            if (!data.expiresAt) {
                data.expiresAt = Date.now() + 3600 * 1000;
            }
            data.expired = false;
            if (!data.tokenLifeLength) {
                data.tokenLifeLength = 3600 * 1000;
            }
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
];
exports.default = checkers;
