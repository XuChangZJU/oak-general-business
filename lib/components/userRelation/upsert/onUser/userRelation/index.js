"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
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
            filter() {
                const { entity, entityId } = this.props;
                return {
                    entity: entity,
                    entityId,
                };
            }
        }],
    formData({ data: userRelations }) {
        const { relations } = this.props;
        const relations2 = relations ? relations.map((relation) => {
            const isChecked = !!(userRelations?.find((ele) => ele.relationId === relation.id && !ele.$$deleteAt$$));
            return {
                isChecked,
                relation,
            };
        }) : [];
        return {
            relations2,
            userRelations,
        };
    },
    listeners: {
        relations() {
            this.reRender();
        },
    },
    methods: {
        onRelationChange(relation, checked) {
            const { entity, entityId } = this.props;
            const { userRelations } = this.state;
            if (checked) {
                const userRelation = userRelations?.find((ele) => ele.relationId === relation.id);
                if (userRelation) {
                    (0, assert_1.default)(userRelation.$$deleteAt$$);
                    this.recoverItem(userRelation.id);
                }
                else {
                    this.addItem({
                        relationId: relation.id,
                        entity,
                        entityId,
                    });
                }
            }
            else {
                const userRelation = userRelations.find((ele) => ele.relationId === relation.id);
                (0, assert_1.default)(userRelation);
                this.removeItem(userRelation.id);
            }
        },
        onRelationChangeMp(e) {
            const { key: relationId, checked } = e.detail;
            const { relations2 } = this.state;
            const userRelation = relations2?.find((ele) => ele.relation.id === relationId);
            this.onRelationChange(userRelation?.relation, checked);
        }
    }
});
