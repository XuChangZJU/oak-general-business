"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakPage({
    path: 'userRelation:list',
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, entityId, relation, entityStr;
            var _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                entity = props.entity, entityId = props.entityId, relation = props.relation;
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
                                    relation: relation
                                },
                                _d["".concat(entity, "Id")] = entityId,
                                _d)
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
        {
            filter: function (_a) {
                var features = _a.features, props = _a.props, onLoadOptions = _a.onLoadOptions;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var userIds;
                    return tslib_1.__generator(this, function (_b) {
                        userIds = props.userIds;
                        return [2 /*return*/, {
                                id: {
                                    $in: userIds,
                                },
                            }];
                    });
                });
            },
        },
    ],
    isList: true,
    formData: function (_a) {
        var users = _a.data, props = _a.props, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entity, entityStr, filter;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        entity = props.entity;
                        entityStr = (0, string_1.firstLetterUpperCase)(entity);
                        return [4 /*yield*/, this.getFilterByName('name')];
                    case 1:
                        filter = _b.sent();
                        return [2 /*return*/, {
                                users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                                    var _a;
                                    var _b = ele || {}, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity, _c = "user".concat(entityStr, "$user"), userEntities = _b[_c];
                                    var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                                    var avatar = extraFile$entity &&
                                        extraFile$entity[0] &&
                                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                                    var user2 = Object.assign({}, ele, {
                                        mobile: mobile,
                                        avatar: avatar,
                                        hasRelation: userEntities.length > 0,
                                    });
                                    return user2;
                                }),
                                searchValue: (filter === null || filter === void 0 ? void 0 : filter.$or)[0].name.$includes,
                            }];
                }
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        userIds: Array,
        relation: String,
    },
    data: {
        show: false,
        searchValue: '',
        deleteIndex: undefined,
    },
    lifetimes: {},
    methods: {
        onRemove: function (event) {
            var index = event.target.dataset.index;
            this.setState({
                show: true,
                deleteIndex: Number(index),
            });
        },
        cancelDelete: function () {
            this.setState({
                show: false,
                deleteIndex: undefined,
            });
        },
        confirmDelete: function () {
            var entity = this.props.entity;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            var deleteIndex = this.state.deleteIndex;
            typeof deleteIndex === 'number' && this.removeNode("user.user".concat(entityStr, "$user"), "".concat(deleteIndex));
            this.setState({
                show: false,
                deleteIndex: undefined,
            });
        },
        onAdd: function (event) {
            var _a;
            var _b = this.props, entity = _b.entity, entityId = _b.entityId, relation = _b.relation;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            var index = event.target.dataset.index;
            this.toggleNode((_a = {},
                _a["".concat(entity, "Id")] = entityId,
                _a.relation = relation,
                _a), true, "".concat(index, ".user").concat(entityStr, "$user"));
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
        goSearch: function () {
            this.navigateTo({
                url: '/user/search',
                toUrl: '/userRelation/detail'
            });
        }
    },
});
