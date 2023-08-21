"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: false,
    properties: {
        entity: '',
        entityId: '',
    },
    data: {
        relations: [],
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, isRoot, filter, userId, relations;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            isRoot = this.features.token.isRoot();
                            filter = {
                                entity: entity,
                                $or: [
                                    {
                                        entityId: entityId,
                                    },
                                    {
                                        entityId: {
                                            $exists: false,
                                        },
                                    }
                                ],
                            };
                            if (!isRoot) {
                                userId = this.features.token.getUserId();
                                filter.relationAuth$destRelation = {
                                    sourceRelation: {
                                        userRelation$relation: {
                                            userId: userId,
                                        },
                                    },
                                };
                            }
                            return [4 /*yield*/, this.features.cache.refresh('relation', {
                                    data: {
                                        id: 1,
                                        entity: 1,
                                        entityId: 1,
                                        name: 1,
                                        display: 1,
                                    },
                                    filter: filter,
                                })];
                        case 1:
                            relations = (_b.sent()).data;
                            this.setState({
                                relations: relations,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    methods: {
        onConfirm: function () {
            this.execute();
        },
        onReset: function () {
            this.clean();
        }
    }
});
