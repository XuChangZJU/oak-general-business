"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const lodash_1 = require("oak-domain/lib/utils/lodash");
exports.default = OakComponent({
    entity() {
        return this.props.entity;
    },
    isList: true,
    projection() {
        const proj = {
            id: 1,
        };
        const schema = this.features.cache.getSchema();
        const { entity } = this.props;
        const { attributes } = schema[entity];
        // guess name attribute
        const { name, title } = attributes;
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
    properties: {
        entity: '',
        entityFilter: {},
        relationIds: [],
        rule: 'single',
        ruleOnRow: 'single',
        onPickRelations: (ids) => undefined,
        onPickRows: (ids) => undefined,
        pickedRowIds: [],
        pickedRelationIds: [],
    },
    formData({ data }) {
        if (data) {
            const { rule, ruleOnRow, relationIds } = this.props;
            const disablePickRow = data?.length === 1 || ruleOnRow === 'all';
            const disablePickRelation = relationIds?.length === 1 || rule === 'all';
            return {
                rows: data.map(ele => ({
                    id: ele.id,
                    value: (ele.name || ele.title || ele.id),
                })),
                disablePickRow,
                disablePickRelation,
                pickRelationRule: disablePickRelation && rule === 'single' ? 'singleFixed' : rule,
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
                if (next.rows && (!prev.rows || (0, lodash_1.difference)(next.rows.map((ele) => ele.id), prev.rows.map((ele) => ele.id)).length > 0)) {
                    onPickRows(next.rows.map((ele) => ele.id));
                }
            }
            else if (ruleOnRow === 'single') {
                if (next.rows?.length === 1 && (!pickedRowIds || next.rows[0].id !== pickedRowIds[0])) {
                    // 如果只有一行数据，直接选中
                    onPickRows([next.rows[0].id]);
                }
                else if (pickedRowIds && pickedRowIds[0] && (!next.rows || !next.rows.find((ele) => ele.id === pickedRowIds[0]))) {
                    // 如果刷新出来的行中不包括已经选中的行，则清空
                    onPickRows([]);
                }
            }
        },
        // 自动选relations
        relationIds(prev, next) {
            const { pickedRelationIds, rule, onPickRelations } = this.props;
            if (rule === 'all') {
                // 如果有新的relationIds出现，全部选中
                if (next.relationIds && (!prev.relationIds || (0, lodash_1.difference)(next.relationIds, prev.relationIds).length > 0)) {
                    onPickRelations(next.relationIds);
                }
            }
            else if (rule === 'single') {
                if (next.relationIds?.length === 1 && (!pickedRelationIds || next.relationIds[0] !== pickedRelationIds[0])) {
                    // 只有一行relation，直接选中
                    onPickRelations(next.relationIds[0]);
                }
                else if (pickedRelationIds && pickedRelationIds[0] && (!next.relationIds || !next.relationIds.includes(pickedRelationIds[0]))) {
                    // 新的relationIds中不包括已经pick的relationId，清空
                    onPickRelations([]);
                }
            }
        }
    },
    lifetimes: {
        async ready() {
            const { relationIds, entity } = this.props;
            const { data: relations } = await this.features.cache.refresh('relation', {
                data: {
                    id: 1,
                    name: 1,
                    entity: 1,
                    entityId: 1,
                },
                filter: {
                    id: {
                        $in: relationIds,
                    }
                }
            });
            relations.forEach(ele => (0, assert_1.assert)(ele.entity === entity));
            this.setState({
                relations,
            });
        }
    }
});
