"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: 'user',
    projection: function (_a) {
        var _b, _c, _d;
        var props = _a.props;
        var entity = props.entity, relations = props.relations, entityId = props.entityId;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        return _b = {
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
            _b;
    },
    filters: [
    // 由调用者注入oakFilter
    ],
    isList: true,
    formData: function (_a) {
        var _b;
        var users = _a.data, props = _a.props, features = _a.features;
        var entity = props.entity;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        if (this.state.oakFullpath) {
            var filter = this.getFilterByName('name');
            return {
                users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                    var _a;
                    var _b = ele || {}, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                    var userEntity = ele["user".concat(entityStr, "$user")];
                    var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                    var avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
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
            };
        }
        return {};
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.removeNamedFilterByName('name');
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
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
            var _a = this.props, entity = _a.entity, entityId = _a.entityId;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            // todo 需要修改为最新写法
            // this.toggleNode(
            //     {
            //         relation,
            //         [`${entity}Id`]: entityId,
            //     },
            //     value,
            //     `${index}.user${entityStr}$user`
            // );
        },
        confirm: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.addOperation({
                                action: 'grant',
                                data: {},
                                filter: {
                                    id: id
                                }
                            });
                            return [4 /*yield*/, this.execute()];
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
