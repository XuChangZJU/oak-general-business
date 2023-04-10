"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    entity: 'user',
    projection: function () {
        var _a, _b, _c;
        var entity = this.props.entity;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        return _a = {
                id: 1
            },
            _a["user".concat(entityStr, "$user")] = {
                $entity: "user".concat(entityStr),
                data: (_b = {
                        id: 1,
                        userId: 1
                    },
                    _b["".concat(entity, "Id")] = 1,
                    _b.relation = 1,
                    _b),
                filter: (_c = {},
                    _c["".concat(entity, "Id")] = this.props.entityId,
                    _c),
            },
            _a;
    },
    filters: [
    // 由调用者注入oakFilter
    ],
    isList: true,
    formData: function (_a) {
        var users = _a.data, props = _a.props, features = _a.features;
        var entity = props.entity, relations = props.relations;
        var entityStr = (0, string_1.firstLetterUpperCase)(entity);
        var relationMap = new Map();
        var relationArr = [];
        var userRelations = [];
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
        return {
            relationArr: relationArr,
            relationMap: relationMap,
        };
    },
    properties: {
        entity: '',
        entityId: '',
        relations: [],
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
