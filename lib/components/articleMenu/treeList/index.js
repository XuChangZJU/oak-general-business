"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'articleMenu',
    isList: true,
    properties: {
        entity: '',
        entityId: '',
        parentId: '',
    },
    projection: {
        id: 1,
        name: 1,
        entity: 1,
        entityId: 1,
        parentId: 1,
        isArticle: 1,
        articleMenu$parent: {
            $entity: 'articleMenu',
            data: {
                id: 1,
            },
            indexFrom: 0,
            count: 1,
        },
        article$articleMenu: {
            $entity: 'article',
            data: {
                id: 1,
            },
            indexFrom: 0,
            count: 1,
        },
    },
    filters: [
        {
            filter: function () {
                var _a = this.props, entity = _a.entity, entityId = _a.entityId, parentId = _a.parentId;
                if (parentId) {
                    return {
                        entity: entity,
                        entityId: entityId,
                        parentId: parentId,
                    };
                }
                return {
                    entity: entity,
                    entityId: entityId,
                    parentId: {
                        $exists: false,
                    },
                };
            }
        }
    ],
    formData: function (_a) {
        var rows = _a.data;
        return {
            rows: rows,
        };
    },
    methods: {
        createOne: function (name) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, parentId;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId, parentId = _a.parentId;
                            this.addItem({
                                name: name,
                                entity: entity,
                                entityId: entityId,
                                parentId: parentId,
                                isArticle: false,
                                isLeaf: false, // 这个属性没用了，但声明成not null了(todo)
                            });
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
