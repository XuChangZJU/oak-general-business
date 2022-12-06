import assert from "assert";
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict } from "../../../../../general-app-domain";

export default OakComponent({
    entity() {
        const { entity } = this.props;
        return `user${firstLetterUpperCase(entity)}` as keyof EntityDict;
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
        entity: String,
        entityId: String,
    },
    isList: true,
    filters: [{
        filter: ({ props }) => {
            const { entity, entityId } = props;
            return {
                [`${entity}Id`]: entityId,
            };
        }
    }],
    formData({ data }) {
        return {
            userRelations: data,
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
        isChecked(relation: string) {
            const { userRelations } = this.state;
            const userRelation = userRelations?.find(
                (ele: { relation: string, $$deleteAt$$: number }) => ele.relation === relation && !ele.$$deleteAt$$
            );
            return !!userRelation;
        }
    }
})