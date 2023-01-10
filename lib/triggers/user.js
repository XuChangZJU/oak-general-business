"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var constants_1 = require("../constants");
var randomUser_1 = require("../utils/randomUser");
var NO_ANY_USER = true;
var triggers = [
    {
        name: '用户的初始状态默认为shadow，设置与本system的连接',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, systemId, setDefaultState, _b, _c, _d;
                var _e, _f, _g;
                return tslib_1.__generator(this, function (_h) {
                    switch (_h.label) {
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
                                    var _a, _b, _c;
                                    var _d, _e, _f;
                                    return tslib_1.__generator(this, function (_g) {
                                        switch (_g.label) {
                                            case 0:
                                                _b = (_a = Object).assign;
                                                _c = [ele];
                                                _d = {};
                                                _e = {};
                                                return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                            case 1:
                                                _e.id = _g.sent(),
                                                    _e.action = 'create';
                                                _f = {};
                                                return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
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
                        case 1:
                            _h.sent();
                            return [2 /*return*/, data.length];
                        case 2:
                            _c = (_b = Object).assign;
                            _d = [data];
                            _e = {};
                            _f = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 3:
                            _f.id = _h.sent(),
                                _f.action = 'create';
                            _g = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 4:
                            _c.apply(_b, _d.concat([(_e.userSystem$user = [(_f.data = (_g.id = _h.sent(),
                                        _g.systemId = systemId,
                                        _g),
                                        _f)],
                                    _e)]));
                            setDefaultState(data);
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
    {
        name: '系统生成的第一个用户默认注册为root',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, result, userData, id, _b, _c, _d;
                var _e, _f;
                return tslib_1.__generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            data = operation.data;
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
                        case 1:
                            result = _g.sent();
                            if (!(result.length === 0)) return [3 /*break*/, 5];
                            userData = data instanceof Array ? data[0] : data;
                            id = userData.id;
                            _c = (_b = context).operate;
                            _d = ['userRole'];
                            _e = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 2:
                            _e.id = _g.sent(),
                                _e.action = 'create';
                            _f = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 3: 
                        // 这里必须要blockTrigger，不然relationHierarchy的默认检查会永远过不去
                        return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.data = (_f.id = _g.sent(),
                                    _f.userId = id,
                                    _f.roleId = constants_1.ROOT_ROLE_ID,
                                    _f.relation = 'owner',
                                    _f),
                                    _e), {
                                    blockTrigger: true,
                                }]))];
                        case 4:
                            // 这里必须要blockTrigger，不然relationHierarchy的默认检查会永远过不去
                            _g.sent();
                            return [2 /*return*/, 1];
                        case 5:
                            NO_ANY_USER = false;
                            _g.label = 6;
                        case 6: return [2 /*return*/, 0];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
