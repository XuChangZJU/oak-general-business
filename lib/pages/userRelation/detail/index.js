"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakComponent({
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, entityId, entityStr;
            var _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
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
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, relations, relations2, entityStr, relationArr, _b, id, nickname, idState, userState, name, mobile$user, extraFile$entity, userRelations, mobile, avatar;
            var _c;
            return tslib_1.__generator(this, function (_d) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
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
