"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'userRelation',
    projection: {
        id: 1,
        userId: 1,
        relationId: 1,
    },
    properties: {
        entity: '',
        entityId: '',
        relations: [],
    },
    isList: true,
    filters: [{
            filter: function () {
                var _a = this.props, entity = _a.entity, entityId = _a.entityId;
                return {
                    entity: entity,
                    entityId: entityId,
                };
            }
        }],
    formData: function (_a) {
        var userRelations = _a.data;
        var relations = this.props.relations;
        var relations2 = relations ? relations.map(function (relation) {
            var isChecked = !!(userRelations === null || userRelations === void 0 ? void 0 : userRelations.find(function (ele) { return ele.relationId === relation.id && !ele.$$deleteAt$$; }));
            return {
                isChecked: isChecked,
                relation: relation,
            };
        }) : [];
        return {
            relations2: relations2,
            userRelations: userRelations,
        };
    },
    listeners: {
        relations: function () {
            this.reRender();
        },
    },
    methods: {
        onRelationChange: function (relation, checked) {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId;
            var userRelations = this.state.userRelations;
            if (checked) {
                var userRelation = userRelations === null || userRelations === void 0 ? void 0 : userRelations.find(function (ele) { return ele.relationId === relation.id; });
                if (userRelation) {
                    (0, assert_1.default)(userRelation.$$deleteAt$$);
                    this.recoverItem(userRelation.id);
                }
                else {
                    this.addItem({
                        relationId: relation.id,
                        entity: entity,
                        entityId: entityId,
                    });
                }
            }
            else {
                var userRelation = userRelations.find(function (ele) { return ele.relationId === relation.id; });
                (0, assert_1.default)(userRelation);
                this.removeItem(userRelation.id);
            }
        },
        onRelationChangeMp: function (e) {
            var _a = e.detail, relationId = _a.key, checked = _a.checked;
            var relations2 = this.state.relations2;
            var userRelation = relations2 === null || relations2 === void 0 ? void 0 : relations2.find(function (ele) { return ele.relation.id === relationId; });
            this.onRelationChange(userRelation === null || userRelation === void 0 ? void 0 : userRelation.relation, checked);
        }
    }
});
