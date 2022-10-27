"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, entityStr;
            var _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                entity = props.entity;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                return [2 /*return*/, (_b = {
                            id: 1
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
                                _d["".concat(entity, "Id")] = props.entityId,
                                _d),
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
        var users = _a.data, props = _a.props, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entity, relations, entityStr, relationMap, relationArr, userRelations;
            return tslib_1.__generator(this, function (_b) {
                entity = props.entity, relations = props.relations;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                relationMap = new Map();
                relationArr = [];
                userRelations = [];
                //构建map对象
                relations === null || relations === void 0 ? void 0 : relations.forEach(function (ele) {
                    relationMap.set(ele, []);
                });
                users === null || users === void 0 ? void 0 : users.forEach(function (ele) {
                    userRelations.push.apply(userRelations, tslib_1.__spreadArray([], tslib_1.__read(ele["user".concat(entityStr, "$user")]), false));
                });
                userRelations.forEach(function (ele) {
                    var userIds = relationMap.get(ele.relation);
                    userIds.push(ele.userId);
                });
                relationMap.forEach(function (value, key) {
                    relationArr.push([key, value]);
                });
                return [2 /*return*/, {
                        relationArr: relationArr,
                        relationMap: relationMap,
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
        show: false,
    },
    lifetimes: {},
    methods: {
        handleClick: function (e) {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId;
            var _b = e.currentTarget.dataset, ids = _b.ids, relation = _b.relation;
            this.navigateTo({
                url: '/userRelation/list',
                entity: entity,
                userIds: ids,
                relation: relation,
                entityId: entityId,
            });
        },
    },
});
