import assert from "assert";
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict } from "../../../../../general-app-domain";

export default OakComponent({
    entity() {
        const { entity } = this.props;
        return `user${firstLetterUpperCase(entity!)}` as keyof EntityDict;
    },
    projection() {
        const { entity } = this.props;
        return {
            id: 1,
            userId: 1,
            relation: 1,
            [`${entity}Id`]: 1,
        };
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
    },
    isList: true,
    filters: [{
        filter() {
            const { entity, entityId } = this.props;
            return {
                [`${entity}Id`]: entityId,
            };
        }
    }],
    formData({ data: userRelations }) {
        const { relations } = this.props;
        const relations2: Array<{
            isChecked: boolean; relation: string;
        }> = relations!.map(
            (relation: string) => {
                const isChecked = !!(userRelations?.find(
                    (ele: any) => ele.relation === relation && !ele.$$deleteAt$$
                ));
                return {
                    isChecked,
                    relation,
                };
            }
        );
        return {
            relations2,
            userRelations,
        };
    },
    methods: {
        onRelationChange(relation: string, checked: boolean) {
            const { entity, entityId } = this.props;
            const { userRelations } = this.state;
            if (checked) {
                const userRelation = userRelations?.find(
                    (ele: { relation: string, id: string, $$deleteAt$$: number }) => ele.relation === relation
                );
                if (userRelation) {
                    assert(userRelation.$$deleteAt$$);
                    this.recoverItem(userRelation.id);
                }
                else {
                    this.addItem({
                        relation,
                        [`${entity}Id`]: entityId,
                    });
                }
            }
            else {
                const userRelation = userRelations!.find(
                    (ele: { relation: string, id: string }) => ele.relation === relation
                );
                assert(userRelation);
                this.removeItem(userRelation.id);
            }
        },
        onRelationChangeMp(e: WechatMiniprogram.TouchEvent) {
            const { key: relation, checked } = e.detail;
            this.onRelationChange(relation, checked);
        },
        isChecked(relation: string) {
            const { userRelations } = this.state;
            const userRelation = userRelations?.find(
                (ele: { relation: string, $$deleteAt$$: number }) => ele.relation === relation && !ele.$$deleteAt$$
            );
            return !!userRelation;
        }
    }
})