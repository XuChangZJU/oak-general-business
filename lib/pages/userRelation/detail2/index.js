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
    path: 'userRelation:detail',
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return __awaiter(void 0, void 0, void 0, function () {
            var entity, entityId, entityStr;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                entity = props.entity, entityId = props.entityId;
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
                            },
                            idState: 1,
                            userState: 1
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
                            filter: (_d = {},
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
    isList: false,
    formData: function (_a) {
        var user = _a.data, props = _a.props;
        return __awaiter(void 0, void 0, void 0, function () {
            var entity, relations, relations2, entityStr, relationArr, _b, id, nickname, idState, userState, name, mobile$user, extraFile$entity, userRelations, mobile, avatar;
            var _c;
            return __generator(this, function (_d) {
                entity = props.entity, relations = props.relations;
                relations2 = typeof relations === 'object'
                    ? relations
                    : relations && JSON.parse(relations);
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                relationArr = [];
                _b = user || {}, id = _b.id, nickname = _b.nickname, idState = _b.idState, userState = _b.userState, name = _b.name, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                userRelations = user && user["user".concat(entityStr, "$user")];
                userRelations = userRelations === null || userRelations === void 0 ? void 0 : userRelations.map(function (ele) { return ele.relation; });
                relations2 === null || relations2 === void 0 ? void 0 : relations2.forEach(function (ele) {
                    relationArr.push({
                        checked: userRelations === null || userRelations === void 0 ? void 0 : userRelations.includes(ele),
                        value: ele,
                    });
                });
                mobile = mobile$user && ((_c = mobile$user[0]) === null || _c === void 0 ? void 0 : _c.mobile);
                avatar = extraFile$entity &&
                    extraFile$entity[0] &&
                    (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                return [2 /*return*/, {
                        id: id,
                        nickname: nickname,
                        name: name,
                        mobile: mobile,
                        avatar: avatar,
                        userState: userState,
                        idState: idState,
                        relationArr: relationArr,
                    }];
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: '',
        },
    },
    methods: {
        onChange: function (event) {
            var value = event.currentTarget.dataset.value;
            var checked = event.detail.checked;
            this.onChangeValue(value, checked);
        },
        onChangeValue: function (value, checked) {
            var _a;
            var _b = this.props, entity = _b.entity, entityId = _b.entityId;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            var nodeData = (_a = {},
                _a["".concat(entity, "Id")] = entityId,
                _a.relation = value,
                _a);
            this.toggleNode(nodeData, checked, "user".concat(entityStr, "$user"));
        },
        onConfirm: function () {
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
