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
var string_1 = require("oak-domain/lib/utils/string");
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakPage({
    path: 'userRelation:list',
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return __awaiter(void 0, void 0, void 0, function () {
            var entity, relations, entityId, entityStr;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                entity = props.entity, relations = props.relations, entityId = props.entityId;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                return [2 /*return*/, (_b = {
                            id: 1,
                            name: 1,
                            nickname: 1,
                            mobile$user: {
                                $entity: 'mobile',
                                data: {
                                    id: 1,
                                    userId: 1,
                                    mobile: 1,
                                },
                            }
                        },
                        _b["user".concat(entityStr, "$user")] = {
                            $entity: "user".concat(entityStr),
                            data: (_c = {
                                    id: 1,
                                    userId: 1
                                },
                                _c["".concat(entity, "Id")] = 1,
                                _c.relation = 1,
                                _c),
                            filter: (_d = {
                                    relation: {
                                        $in: relations,
                                    }
                                },
                                _d["".concat(entity, "Id")] = entityId,
                                _d),
                        },
                        _b.extraFile$entity = {
                            $entity: 'extraFile',
                            data: {
                                id: 1,
                                tag1: 1,
                                origin: 1,
                                bucket: 1,
                                objectId: 1,
                                filename: 1,
                                extra1: 1,
                                type: 1,
                                entity: 1,
                                extension: 1,
                            },
                            filter: {
                                tag1: 'avatar',
                            },
                            indexFrom: 0,
                            count: 1,
                        },
                        _b)];
            });
        });
    },
    filters: [
    // 由调用者注入oakFilter
    ],
    isList: true,
    formData: function (_a) {
        var _b;
        var users = _a.data, props = _a.props, features = _a.features;
        return __awaiter(this, void 0, void 0, function () {
            var entity, entityStr, filter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        entity = props.entity;
                        entityStr = (0, string_1.firstLetterUpperCase)(entity);
                        return [4 /*yield*/, this.getFilterByName('name')];
                    case 1:
                        filter = _c.sent();
                        return [2 /*return*/, {
                                users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                                    var _a;
                                    var _b = ele || {}, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                                    var userEntity = ele["user".concat(entityStr, "$user")];
                                    var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                                    var avatar = extraFile$entity &&
                                        extraFile$entity[0] &&
                                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                                    var relations = userEntity === null || userEntity === void 0 ? void 0 : userEntity.map(function (ele) { return ele.relation; });
                                    var hasRelation = props.relations.map(function (ele2) {
                                        return relations.includes(ele2);
                                    });
                                    var user2 = Object.assign({}, ele, {
                                        mobile: mobile,
                                        avatar: avatar,
                                        relations: relations,
                                        hasRelation: hasRelation,
                                    });
                                    return user2;
                                }),
                                searchValue: (filter === null || filter === void 0 ? void 0 : filter.$or) &&
                                    ((_b = filter.$or[0]) === null || _b === void 0 ? void 0 : _b.name.$includes),
                            }];
                }
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        searchValue: '',
    },
    lifetimes: {},
    methods: {
        searchChange: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    value = this.resolveInput(input).value;
                    this.addNamedFilter({
                        filter: {
                            $or: [
                                {
                                    name: {
                                        $includes: value,
                                    },
                                },
                                {
                                    nickname: {
                                        $includes: value,
                                    },
                                },
                            ],
                        },
                        '#name': 'name',
                    });
                    return [2 /*return*/];
                });
            });
        },
        searchCancel: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.removeNamedFilterByName('name');
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.refresh();
                    return [2 /*return*/];
                });
            });
        },
        onChange: function (input) {
            var _a = this.resolveInput(input), dataset = _a.dataset, value = _a.value;
            var _b = dataset, userId = _b.id, relation = _b.relation, index = _b.index;
            this.onChangeValue(value, relation, index);
        },
        onChangeValue: function (value, relation, index) {
            var _a;
            var _b = this.props, entity = _b.entity, entityId = _b.entityId;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            this.toggleNode((_a = {
                    relation: relation
                },
                _a["".concat(entity, "Id")] = entityId,
                _a), value, "".concat(index, ".user").concat(entityStr, "$user"));
        },
        confirm: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute('grant')];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.navigateBack()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
