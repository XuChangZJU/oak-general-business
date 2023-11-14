import { EntityDict } from '../../../../oak-app-domain';
import { assert } from 'oak-domain/lib/utils/assert';
import { difference } from 'oak-domain/lib/utils/lodash';

export default OakComponent({
    entity() {
        return this.props.entity!;
    },
    isList: true,
    projection() {
        const proj = {
            id: 1,
        };
        const schema = this.features.cache.getSchema();
        const { entity } = this.props;
        const { attributes } = schema[entity!];
        // guess name attribute
        const { name, title } = attributes as any;
        if (name && ['varchar', 'text'].includes(name.type)) {
            Object.assign(proj, {
                name: 1,
            });
        }
        if (title && ['varchar', 'text'].includes(title.type)) {
            Object.assign(proj, {
                title: 1,
            });
        }

        return proj;
    },
    filters: [
        {
            filter() {
                const { entityFilter } = this.props;
                assert(entityFilter);
                return entityFilter;
            },
        }
    ],
    properties: {
        disabled: false as boolean | undefined,
        entity: '' as keyof EntityDict,
        entityFilter: {} as any,
        relationIds: [] as string[],
        rule: 'single' as EntityDict['userEntityGrant']['OpSchema']['rule'],
        ruleOnRow: 'single' as EntityDict['userEntityGrant']['OpSchema']['ruleOnRow'],
        onPickRelations: (ids: string[]) => undefined as void,
        onPickRows: (ids: string[]) => undefined as void,
        pickedRowIds: [] as string[] | undefined,
        pickedRelationIds: [] as string[] | undefined,
    },
    data: {
        relations: [],
        onPickRelationsMp(val: string[]) {
            this.props.onPickRelations(val);
        },
        onPickRowsMp(val: string[]) {
            this.props.onPickRows(val);
        }
    } as {
        relations: EntityDict['relation']['OpSchema'][];
    } & ThisType<{
        props: {
            onPickRelations: (val: string[]) => void;
            onPickRows: (val: string[]) => void;
        }
    }>,
    formData({ data }) {
        if (data) {
            const { rule, ruleOnRow, relationIds, entity } = this.props;
            const disablePickRow = data?.length === 1 || ruleOnRow === 'all';
            const disablePickRelation = relationIds?.length === 1 || rule === 'all';
            const { relations } = this.state;
            return {
                rows: (data as any[]).map(ele => ({
                    id: ele.id,
                    value: (ele.name || ele.title || ele.id) as string,
                })),
                disablePickRow,
                disablePickRelation,
                pickRelationRule: disablePickRelation && rule === 'single' ? 'singleFixed' : rule,
                relationOption: relations?.map(
                    (r) => ({
                        label: this.t(`${entity}:r.${r.name}`),
                        value: r.id,
                    })
                ),
                rowOption: (data as any[]).map(ele => ({
                    value: ele.id,
                    label: (ele.name || ele.title || ele.id) as string,
                })),
            };
        }
        return {
            rows: null,
        };
    },
    listeners: {
        // 自动选行
        rows(prev, next) {
            const { pickedRowIds, onPickRows, ruleOnRow } = this.props;
            if (ruleOnRow === 'all') {
                // 如果有新的行出现，全部选中
                if (next.rows && (!prev.rows || difference(next.rows.map((ele: { id: string }) => ele.id), prev.rows.map((ele: { id: string }) => ele.id)).length > 0)) {
                    onPickRows!(next.rows.map((ele: { id: string }) => ele.id));
                }
            }
            else if (ruleOnRow === 'single') {
                if (next.rows?.length === 1 && (!pickedRowIds || next.rows[0].id !== pickedRowIds[0])) {
                    // 如果只有一行数据，直接选中
                    onPickRows!([next.rows[0].id]);
                }
                else if (pickedRowIds && pickedRowIds[0] && (!next.rows || !next.rows.find((ele: { id: string }) => ele.id === pickedRowIds[0]))) {
                    // 如果刷新出来的行中不包括已经选中的行，则清空
                    onPickRows!([]);
                }
            }
        },
        // 自动选relations
        relationIds(prev, next) {
            const { pickedRelationIds, rule, onPickRelations } = this.props;
            if (rule === 'all') {
                // 如果有新的relationIds出现，全部选中
                if (next.relationIds && (!prev.relationIds || difference(next.relationIds, prev.relationIds).length > 0)) {
                    onPickRelations!(next.relationIds);
                }
            }
            else if (rule === 'single') {
                if (next.relationIds?.length === 1 && (!pickedRelationIds || next.relationIds[0] !== pickedRelationIds[0])) {
                    // 只有一行relation，直接选中
                    onPickRelations!(next.relationIds[0]);
                }
                else if (pickedRelationIds && pickedRelationIds[0] && (!next.relationIds || !next.relationIds.includes(pickedRelationIds[0]))) {
                    // 新的relationIds中不包括已经pick的relationId，清空
                    onPickRelations!([]);
                }
            }
        }
    },
    lifetimes: {
        async ready() {
            const { relationIds, entity, rule, onPickRelations, disabled } = this.props;

            assert(relationIds!.length > 0);
            const { data: relations } = await this.features.cache.refresh('relation', {
                data: {
                    id: 1,
                    name: 1,
                    entity: 1,
                    entityId: 1,
                },
                filter: {
                    id: {
                        $in: relationIds!,
                    }
                }
            });

            relations.forEach(
                ele => assert(ele.entity === entity)
            );
            this.setState({
                relations: relations as EntityDict['relation']['OpSchema'][],
            });

            assert(relations.length === relationIds!.length);
            
            if (!disabled) {
                if (rule === 'all') {
                    onPickRelations!(relationIds!);
                }
                else if (rule === 'single' && relationIds!.length === 1) {
                    onPickRelations!(relationIds!);
                }
            }
        }
    },
})