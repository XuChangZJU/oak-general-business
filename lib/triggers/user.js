"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var constants_1 = require("../constants");
var randomUser_1 = require("../utils/randomUser");
var types_1 = require("oak-domain/lib/types");
var NO_ANY_USER = true;
var triggers = [
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, systemId, setDefaultState, result, userData, userRoleData;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data;
                            return [4 /*yield*/, context.getSystemId()];
                        case 1:
                            systemId = _b.sent();
                            setDefaultState = function (userData) {
                                if (!userData.userState) {
                                    userData.userState = 'shadow';
                                }
                                if (!userData.nickname) {
                                    userData.nickname = (0, randomUser_1.randomName)('user_', 8);
                                }
                            };
                            if (!(data instanceof Array)) return [3 /*break*/, 3];
                            return [4 /*yield*/, Promise.all(data.map(function (ele) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        Object.assign(ele, {
                                            userSystem$user: [{
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'create',
                                                    data: {
                                                        id: (0, uuid_1.generateNewId)(),
                                                        systemId: systemId,
                                                    }
                                                }],
                                        });
                                        setDefaultState(ele);
                                        return [2 /*return*/];
                                    });
                                }); }))];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            Object.assign(data, {
                                userSystem$user: [{
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'create',
                                        data: {
                                            id: (0, uuid_1.generateNewId)(),
                                            systemId: systemId,
                                        }
                                    }],
                            });
                            setDefaultState(data);
                            _b.label = 4;
                        case 4:
                            if (!NO_ANY_USER) return [3 /*break*/, 6];
                            return [4 /*yield*/, context.select('user', {
                                    data: {
                                        id: 1,
                                    },
                                    filter: {
                                        id: {
                                            $ne: constants_1.ROOT_USER_ID,
                                        },
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 5:
                            result = _b.sent();
                            if (result.length === 0) {
                                userData = data instanceof Array ? data[0] : data;
                                userRoleData = {
                                    id: (0, uuid_1.generateNewId)(),
                                    userId: userData.id,
                                    roleId: constants_1.ROOT_ROLE_ID,
                                    relation: 'owner',
                                };
                                Object.assign(userData, {
                                    userRole$user: [
                                        {
                                            id: (0, uuid_1.generateNewId)(),
                                            action: 'create',
                                            data: userRoleData,
                                        }
                                    ]
                                });
                                return [2 /*return*/, 1];
                            }
                            else {
                                NO_ANY_USER = false;
                            }
                            _b.label = 6;
                        case 6: return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
    {
        name: '当扮演某个用户时，切换当前用户的token中的userId',
        entity: 'user',
        action: 'play',
        when: 'after',
        fn: function (_a, context, option) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var filter, token, id, userId;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            filter = operation.filter;
                            (0, assert_1.assert)(filter.id);
                            token = context.getToken();
                            id = token.id, userId = token.userId;
                            if (userId === filter.id) {
                                throw new types_1.OakRowInconsistencyException(undefined, '您已经是当前用户');
                            }
                            return [4 /*yield*/, context.operate('token', {
                                    id: (0, uuid_1.generateNewId)(),
                                    action: 'update',
                                    data: {
                                        userId: filter.id,
                                    },
                                    filter: {
                                        id: id,
                                    }
                                }, option)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
