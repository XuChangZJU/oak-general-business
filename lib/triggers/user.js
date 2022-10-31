"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var constants_1 = require("../constants");
var filter_1 = require("oak-domain/lib/store/filter");
var randomUser_1 = require("../utils/randomUser");
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
                var data, systemId, setDefaultState, _b, _c, _d, rowStore, result, userData, userRoleData, _e, _f, _g;
                var _h, _j, _k, _l, _m, _o;
                return tslib_1.__generator(this, function (_p) {
                    switch (_p.label) {
                        case 0:
                            data = operation.data;
                            return [4 /*yield*/, context.getSystemId()];
                        case 1:
                            systemId = _p.sent();
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
                                    var _a, _b, _c;
                                    var _d, _e, _f;
                                    return tslib_1.__generator(this, function (_g) {
                                        switch (_g.label) {
                                            case 0:
                                                _b = (_a = Object).assign;
                                                _c = [ele];
                                                _d = {};
                                                _e = {};
                                                return [4 /*yield*/, generateNewId()];
                                            case 1:
                                                _e.id = _g.sent(),
                                                    _e.action = 'create';
                                                _f = {};
                                                return [4 /*yield*/, generateNewId()];
                                            case 2:
                                                _b.apply(_a, _c.concat([(_d.userSystem$user = [(_e.data = (_f.id = _g.sent(),
                                                            _f.systemId = systemId,
                                                            _f),
                                                            _e)],
                                                        _d)]));
                                                setDefaultState(ele);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 2:
                            _p.sent();
                            return [3 /*break*/, 6];
                        case 3:
                            _c = (_b = Object).assign;
                            _d = [data];
                            _h = {};
                            _j = {};
                            return [4 /*yield*/, generateNewId()];
                        case 4:
                            _j.id = _p.sent(),
                                _j.action = 'create';
                            _k = {};
                            return [4 /*yield*/, generateNewId()];
                        case 5:
                            _c.apply(_b, _d.concat([(_h.userSystem$user = [(_j.data = (_k.id = _p.sent(),
                                        _k.systemId = systemId,
                                        _k),
                                        _j)],
                                    _h)]));
                            setDefaultState(data);
                            _p.label = 6;
                        case 6:
                            if (!NO_ANY_USER) return [3 /*break*/, 11];
                            rowStore = context.rowStore;
                            return [4 /*yield*/, rowStore.select('user', {
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
                                }, context, {
                                    dontCollect: true,
                                })];
                        case 7:
                            result = (_p.sent()).result;
                            if (!(result.length === 0)) return [3 /*break*/, 10];
                            userData = data instanceof Array ? data[0] : data;
                            _l = {};
                            return [4 /*yield*/, generateNewId()];
                        case 8:
                            userRoleData = (_l.id = _p.sent(),
                                _l.userId = userData.id,
                                _l.roleId = constants_1.ROOT_ROLE_ID,
                                _l.relation = 'owner',
                                _l);
                            _f = (_e = Object).assign;
                            _g = [userData];
                            _m = {};
                            _o = {};
                            return [4 /*yield*/, generateNewId()];
                        case 9:
                            _f.apply(_e, _g.concat([(_m.userRole$user = [
                                    (_o.id = _p.sent(),
                                        _o.action = 'create',
                                        _o.data = userRoleData,
                                        _o)
                                ],
                                    _m)]));
                            return [2 /*return*/, 1];
                        case 10:
                            NO_ANY_USER = false;
                            _p.label = 11;
                        case 11: return [2 /*return*/, 0];
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
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var filter, id, _b, _c, _d;
                var _e;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            filter = operation.filter;
                            (0, assert_1.assert)(filter.id);
                            return [4 /*yield*/, context.getToken()];
                        case 1:
                            id = (_f.sent()).id;
                            _c = (_b = context.rowStore).operate;
                            _d = ['token'];
                            _e = {};
                            return [4 /*yield*/, generateNewId()];
                        case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                                    _e.action = 'update',
                                    _e.data = {
                                        userId: filter.id,
                                    },
                                    _e.filter = {
                                        id: id,
                                    },
                                    _e), context, {
                                    dontCollect: true,
                                }]))];
                        case 3:
                            _f.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
    {
        name: '查询用户时，默认加上systemId',
        entity: 'user',
        action: 'select',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var app, filter;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, context.getApplication()];
                        case 1:
                            app = _b.sent();
                            if (app) {
                                filter = operation.filter;
                                if (!filter) {
                                    Object.assign(operation, {
                                        filter: {
                                            id: {
                                                $in: {
                                                    entity: 'userSystem',
                                                    data: {
                                                        userId: 1,
                                                    },
                                                    filter: {
                                                        systemId: app.systemId,
                                                    }
                                                }
                                            }
                                        },
                                    });
                                }
                                else {
                                    Object.assign(operation, {
                                        filter: (0, filter_1.addFilterSegment)({
                                            id: {
                                                $in: {
                                                    entity: 'userSystem',
                                                    data: {
                                                        userId: 1,
                                                    },
                                                    filter: {
                                                        systemId: app.systemId,
                                                    }
                                                }
                                            }
                                        }, filter),
                                    });
                                }
                                return [2 /*return*/, 1];
                            }
                            return [2 /*return*/, 0];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
