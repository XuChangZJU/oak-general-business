"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var constants_1 = require("../constants");
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
                                            userSystem$user: [
                                                {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    action: 'create',
                                                    data: {
                                                        id: (0, uuid_1.generateNewId)(),
                                                        systemId: systemId,
                                                    },
                                                },
                                            ],
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
                                userSystem$user: [
                                    {
                                        id: (0, uuid_1.generateNewId)(),
                                        action: 'create',
                                        data: {
                                            id: (0, uuid_1.generateNewId)(),
                                            systemId: systemId,
                                        },
                                    },
                                ],
                            });
                            setDefaultState(data);
                            _b.label = 3;
                        case 3: return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, result;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data;
                            (0, assert_1.default)(!(data instanceof Array));
                            if (!NO_ANY_USER) return [3 /*break*/, 2];
                            return [4 /*yield*/, context.select('user', {
                                    data: {
                                        id: 1,
                                    },
                                    filter: {
                                        isRoot: true,
                                        id: {
                                            $ne: constants_1.ROOT_USER_ID,
                                        }
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, {
                                    dontCollect: true,
                                })];
                        case 1:
                            result = _b.sent();
                            if (result.length === 0) {
                                Object.assign(data, {
                                    isRoot: true,
                                });
                            }
                            else {
                                NO_ANY_USER = false;
                            }
                            _b.label = 2;
                        case 2: return [2 /*return*/, 0];
                    }
                });
            });
        },
    },
    {
        name: '当用户被激活时，将所有的parasite作废',
        entity: 'user',
        action: 'activate',
        when: 'after',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var _b, data, filter, parasiteList, parasiteIds, _c, _d, _e, _f, _g, _h;
                var _j, _k;
                return tslib_1.__generator(this, function (_l) {
                    switch (_l.label) {
                        case 0:
                            _b = operation, data = _b.data, filter = _b.filter;
                            (0, assert_1.default)(!(data instanceof Array));
                            return [4 /*yield*/, context.select('parasite', {
                                    data: {
                                        id: 1,
                                    },
                                    filter: {
                                        user: filter,
                                        expired: false,
                                    },
                                }, {})];
                        case 1:
                            parasiteList = _l.sent();
                            parasiteIds = parasiteList.map(function (ele) { return ele.id; });
                            if (!(parasiteIds.length > 0)) return [3 /*break*/, 6];
                            _d = (_c = context).operate;
                            _e = ['parasite'];
                            _j = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([(_j.id = _l.sent(),
                                    _j.action = 'update',
                                    _j.data = {
                                        expired: true,
                                    },
                                    _j.filter = {
                                        id: {
                                            $in: parasiteIds
                                        }
                                    },
                                    _j), { blockTrigger: true }]))];
                        case 3:
                            _l.sent();
                            _g = (_f = context).operate;
                            _h = ['token'];
                            _k = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 4: return [4 /*yield*/, _g.apply(_f, _h.concat([(_k.id = _l.sent(),
                                    _k.action = 'disable',
                                    _k.data = {},
                                    _k.filter = {
                                        ableState: 'enabled',
                                        entity: 'parasite',
                                        entityId: {
                                            $in: parasiteIds
                                        }
                                    },
                                    _k), { blockTrigger: true }]))];
                        case 5:
                            _l.sent();
                            _l.label = 6;
                        case 6: 
                        // operation的级联写法目前不能正确解析上层对象对下层对象的filter关系
                        // data.parasite$user = { 
                        //     id: await generateNewIdAsync(),
                        //     action: 'update',
                        //     data: {
                        //         expired: true,
                        //         token$entity: {
                        //             id: await generateNewIdAsync(),
                        //             action: 'disable',
                        //             data: {},
                        //             filter: {
                        //                 ableState: 'enabled',
                        //                 parasite: {
                        //                     userId: {
                        //                         $in: {
                        //                             entity: 'user',
                        //                             data: {
                        //                                 id: 1,
                        //                             },
                        //                             filter,
                        //                         }
                        //                     }
                        //                 }
                        //             }
                        //         },
                        //     },
                        //     filter: {
                        //         userId: {
                        //             $in: {
                        //                 entity: 'user',
                        //                 data: {
                        //                     id: 1,
                        //                 },
                        //                 filter,
                        //             }
                        //         }
                        //     }
                        // };
                        return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
];
exports.default = triggers;
