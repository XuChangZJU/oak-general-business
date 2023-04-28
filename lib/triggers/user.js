"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var randomUser_1 = require("../utils/randomUser");
var assert_1 = tslib_1.__importDefault(require("assert"));
var NO_ANY_USER = true;
var triggers = [
    {
        name: '用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, systemId, setDefaultState;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data;
                            systemId = context.getSystemId();
                            setDefaultState = function (userData) {
                                if (!userData.userState) {
                                    userData.userState = 'shadow';
                                }
                                if (!userData.nickname) {
                                    userData.nickname = (0, randomUser_1.randomName)('user_', 8);
                                }
                            };
                            if (!(data instanceof Array)) return [3 /*break*/, 2];
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
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
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
                            _b.label = 3;
                        case 3: return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, result, id;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data;
                            (0, assert_1.default)(!(data instanceof Array));
                            if (!NO_ANY_USER) return [3 /*break*/, 4];
                            return [4 /*yield*/, Promise.all([
                                    context.select('user', {
                                        data: {
                                            id: 1,
                                        },
                                        filter: {
                                            id: {
                                                $in: {
                                                    entity: 'userRelation',
                                                    data: {
                                                        userId: 1,
                                                    },
                                                    filter: {
                                                        relation: {
                                                            entity: 'role',
                                                            name: 'owner',
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        indexFrom: 0,
                                        count: 1,
                                    }, {
                                        dontCollect: true,
                                    }),
                                    context.select('relation', {
                                        data: {
                                            id: 1,
                                        },
                                        filter: {
                                            name: 'owner',
                                            entity: 'role',
                                        }
                                    }, {
                                        dontCollect: true,
                                    })
                                ])];
                        case 1:
                            result = _b.sent();
                            if (!(result[0].length === 0)) return [3 /*break*/, 3];
                            (0, assert_1.default)(result[1].length > 0);
                            id = result[1][0].id;
                            return [4 /*yield*/, context.operate('userRelation', {
                                    id: (0, uuid_1.generateNewId)(),
                                    action: 'create',
                                    data: {
                                        id: (0, uuid_1.generateNewId)(),
                                        userId: data.id,
                                        relationId: id,
                                    },
                                }, {
                                    blockTrigger: true,
                                    dontCollect: true,
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, 1];
                        case 3:
                            NO_ANY_USER = false;
                            _b.label = 4;
                        case 4: return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
