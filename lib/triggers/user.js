"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("oak-domain/lib/utils/assert");
var constants_1 = require("../constants");
var filter_1 = require("oak-domain/lib/store/filter");
var NO_ANY_USER = true;
var triggers = [
    {
        name: '系统生成的第一个用户默认注册为root，用户的初始状态默认为shadow',
        entity: 'user',
        action: 'create',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return __awaiter(void 0, void 0, void 0, function () {
                var data, systemId, setDefaultState, rowStore, result, userData, userRoleData;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            data = operation.data;
                            return [4 /*yield*/, context.getSystemId()];
                        case 1:
                            systemId = _c.sent();
                            setDefaultState = function (userData) {
                                if (!userData.userState) {
                                    userData.userState = 'shadow';
                                }
                            };
                            if (data instanceof Array) {
                                data.forEach(function (ele) {
                                    Object.assign(ele, {
                                        systemId: systemId,
                                    });
                                    setDefaultState(ele);
                                });
                            }
                            else {
                                Object.assign(data, {
                                    systemId: systemId,
                                });
                                setDefaultState(data);
                            }
                            if (!NO_ANY_USER) return [3 /*break*/, 5];
                            rowStore = context.rowStore;
                            return [4 /*yield*/, rowStore.select('user', {
                                    data: {
                                        id: 1,
                                    },
                                    filter: {
                                        id: {
                                            $ne: constants_1.ROOT_USER_ID,
                                        },
                                        systemId: systemId,
                                    },
                                    indexFrom: 0,
                                    count: 1,
                                }, context, params)];
                        case 2:
                            result = (_c.sent()).result;
                            if (!(result.length === 0)) return [3 /*break*/, 4];
                            userData = data instanceof Array ? data[0] : data;
                            _b = {};
                            return [4 /*yield*/, generateNewId()];
                        case 3:
                            userRoleData = (_b.id = _c.sent(),
                                _b.userId = userData.id,
                                _b.roleId = constants_1.ROOT_ROLE_ID,
                                _b.relation = 'owner',
                                _b);
                            Object.assign(userData, {
                                userRole$user: [
                                    {
                                        action: 'create',
                                        data: userRoleData,
                                    }
                                ]
                            });
                            return [2 /*return*/, 1];
                        case 4:
                            NO_ANY_USER = false;
                            _c.label = 5;
                        case 5: return [2 /*return*/, 0];
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
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return __awaiter(void 0, void 0, void 0, function () {
                var filter, id;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            filter = operation.filter;
                            (0, assert_1.assert)(filter.id);
                            return [4 /*yield*/, context.getToken()];
                        case 1:
                            id = (_b.sent()).id;
                            return [4 /*yield*/, context.rowStore.operate('token', {
                                    action: 'update',
                                    data: {
                                        userId: filter.id,
                                    },
                                    filter: {
                                        id: id,
                                    }
                                }, context)];
                        case 2:
                            _b.sent();
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
            return __awaiter(void 0, void 0, void 0, function () {
                var app, filter;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, context.getApplication()];
                        case 1:
                            app = _b.sent();
                            if (app) {
                                filter = operation.filter;
                                if (!filter) {
                                    Object.assign(operation, {
                                        filter: {
                                            systemId: app.systemId,
                                        },
                                    });
                                }
                                else {
                                    Object.assign(operation, {
                                        filter: (0, filter_1.addFilterSegment)({
                                            systemId: app.systemId,
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
