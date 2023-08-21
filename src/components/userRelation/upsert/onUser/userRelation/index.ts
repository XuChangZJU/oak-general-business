import assert from "assert";
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict } from "../../../../../oak-app-domain";

export default OakComponent({
    entity: 'userRelation',
    projection: {
        id: 1,
        userId: 1,
        relationId: 1,
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as EntityDict['relation']['OpSchema'][],
    },
    isList: true,
    filters: [{
        filter() {
            const { entity, entityId } = this.props;
            return {
                entity: entity as string,
                entityId,
            };
        }
    }],
    formData({ data: userRelations }) {
        const { relations } = this.props;
        const relations2: Array<{
            isChecked: boolean; relation: EntityDict['relation']['OpSchema'];
        }> = relations ? relations.map(
            (relation) => {
                const isChecked = !!(userRelations?.find(
                    (ele: any) => ele.relationId === relation.id && !ele.$$deleteAt$$
                ));
                return {
                    isChecked,
                    relation,
                };
            }
        ) : [];
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
        onRelationChange(relation: EntityDict['relation']['OpSchema'], checked: boolean) {
            const { entity, entityId } = this.props;
            const { userRelations } = this.state;
            if (checked) {
                const userRelation = userRelations?.find(
                    (ele: EntityDict['userRelation']['OpSchema']) => ele.relationId === relation.id
                );
                if (userRelation) {
                    assert(userRelation.$$deleteAt$$);
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
                const userRelation = userRelations!.find(
                    (ele: EntityDict['userRelation']['OpSchema']) => ele.relationId === relation.id,
                );
                assert(userRelation);
                this.removeItem(userRelation.id);
            }
        },
        onRelationChangeMp(e: WechatMiniprogram.TouchEvent) {
            const { key: relationId, checked } = e.detail;
            const { relations2 } = this.state;
            const userRelation = relations2?.find(
                (ele: {
                    isChecked: boolean;
                    relation: EntityDict['relation']['OpSchema'];
                }) => ele.relation.id === relationId
            );
            this.onRelationChange(userRelation?.relation, checked);
        }
    }
})