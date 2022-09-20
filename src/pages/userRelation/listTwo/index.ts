import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../utils/extraFile';
import React from '../../../utils/react';

export default OakPage({
    entity: 'user',
    projection: async ({ props }) => {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        return {
            id: 1,
            name: 1,
            nickname: 1,
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    userId: 1,
                    mobile: 1,
                },
            },
            [`user${entityStr}$user`]: {
                $entity: `user${entityStr}`,
                data: {
                    id: 1,
                    userId: 1,
                    [`${entity}Id`]: 1,
                    relation: 1,
                },
            },
            extraFile$entity: {
                $entity: 'extraFile',
                data: {
                    id: 1,
                    tag1: 1,
                    origin: 1,
                    bucket: 1,
                    objectId: 1,
                    filename: 1,
                    extra1: 1,
                    type: 1,
                    entity: 1,
                    extension: 1,
                },
                filter: {
                    tag1: 'avatar',
                },
                indexFrom: 0,
                count: 1,
            },
        };
    },
    filters: [
        // 由调用者注入oakFilter
        {
            filter: async ({ features, props, onLoadOptions }) => {
                const { entityId, entity } = props;
                const entityStr = firstLetterUpperCase(entity!);
                return {
                    id: {
                        $in: {
                            entity: `user${entityStr}`,
                            data: {
                                userId: 1,
                            },
                            filter: {
                                [`${entity}Id`]: entityId,
                            },
                        },
                    },
                };
            },
        },
    ],
    isList: true,
    async formData ({ data: users, props, features }) {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const filter = await this.getFilterByName('name');
        return {
            users: users?.map((ele: any) => {
                const { mobile$user, extraFile$entity } = ele || {};
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const relations = ele[`user${entityStr}$user`]
                    ?.filter((rt: any) => rt[`${entity}Id`] === entityId)
                    .map((rt2: any) => rt2.relation);
                const avatar =
                    extraFile$entity &&
                    extraFile$entity[0] &&
                    composeFileUrl(extraFile$entity[0]);
                const user2 = Object.assign({}, ele, {
                    mobile,
                    avatar,
                    relations,
                });
                return user2;
            }),
            searchValue:
                filter?.$or &&
                (filter.$or as [{ name: { $includes: string } }])[0]?.name
                    .$includes,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        userIds: Array,
        relations: Array,
    },
    data: {
        show: false,
        searchValue: '',
        deleteIndex: '',
        editableRowKeys: [] as string[],
        btnItems: [
            {
                label: '二维码授权',
            },
            {
                label: '添加授权',
            },
        ],
        visible: false,
    },
    lifetimes: {
        created() {
            if (process.env.OAK_PLATFORM === 'web') {
                (this as any).tableRef = React.createRef();
                (this as any).editMap = {};
                (this as any).currentSaveId = '';
            }
        },
    },
    methods: {
        onAdd() {
            if (process.env.OAK_PLATFORM === 'web') {
                this.goUpsert();
            } else {
                this.setState({
                    visible: true,
                });
            }
        },
        goUpsert() {
             const { entity, entityId, relations } = this.props;
             this.navigateTo(
                 {
                     url: '/userRelation/upsert',
                     entity,
                     entityId,
                     relations,
                 },
                 {
                     relations,
                 }
             );
        },
        goUserEntityGrantWithGrant() {
            const { entity, entityId, relations } = this.props;
            this.navigateTo(
                {
                    url: '/userEntityGrant/grant',
                    entity,
                    entityId,
                },
                {
                    relations,
                }
            );
        },
        onActionSelect(e: any) {
            const { index, selected } = e.detail;
            switch (index) {
                case 0: {
                    this.goUserEntityGrantWithGrant();
                }
                case 1: {
                    this.goUpsert();
                }
            }
        },
        onActionCancel() {
            this.setState({
                visible: false,
            });
        },
        onActionClose() {
            this.onActionCancel();
        },
        bindClicked(e: any) {
            const { id } = e.currentTarget.dataset;
            this.goDetail(id);
        },
        goDetail(id: string) {
            const { relations, entity, entityId } = this.props;
            this.navigateTo({
                url: '/userRelation/detail2',
                oakId: id,
                relations,
                entity,
                entityId,
            });
        },
        async searchChange(event: any) {
            const { value } = this.resolveInput(event);
            this.addNamedFilter({
                filter: {
                    id: {
                        $in: {
                            entity: 'mobile',
                            data: {
                                userId: 1,
                            },
                            filter: {
                                mobile: {
                                    $includes: value,
                                },
                            },
                        },
                    },
                },
                '#name': 'mobile',
            });
        },
        async searchCancel() {
            this.removeNamedFilterByName('mobile');
        },
        async searchConfirm() {
            this.refresh();
        },
        // web table methods
        onEdit(e: any) {
            const { editableRowKeys } = this.state;

            const { id } = e.currentTarget.dataset;
            if (!editableRowKeys.includes(id)) {
                this.setState({
                    editableRowKeys: editableRowKeys.concat(id),
                });
            }
        },
        updateEditRowKey(id: string) {
            const { editableRowKeys } = this.state;
            const index = editableRowKeys.findIndex((t) => t === id);
            editableRowKeys.splice(index, 1);
            this.setState({
                editableRowKeys: [...editableRowKeys],
            });
        },
        onSave(e: any) {
            const { id } = e.currentTarget.dataset;
            (this as any).currentSaveId = id;
            // 触发内部校验，而后在 onRowValidate 中接收异步校验结果
            (this as any).tableRef.current.validateRowData(id);
        },
        onCancel(e: any) {
            const { id } = e.currentTarget.dataset;
            this.updateEditRowKey(id);
            (this as any).tableRef.current.clearValidateData();
        },
        onRowValidate(params: any) {
            if (params.result.length) {
                const r = params.result[0];
                this.setMessage({
                    type: 'error',
                    content: `${r.col.title} ${r.errorList[0].message}`,
                });
                return;
            }
            // 如果是 table 的父组件主动触发校验
            if (params.trigger === 'parent' && !params.result.length) {
                const { users } = this.state;
                const { entity, entityId } = this.props;
                const entityStr = firstLetterUpperCase(entity!);

                const current = (this as any).editMap[(this as any).currentSaveId];
                if (current) {
                    Object.keys(current.editedRow).forEach((ele) => {
                        if (ele === 'relations') {
                            const userRelations =
                                users[current.rowIndex].relations;
                            userRelations.forEach((ele2: any) => {
                                if (!current.editedRow[ele].includes(ele2)) {
                                    this.toggleNode(
                                        {
                                            relation: ele2,
                                            [`${entity}Id`]: entityId,
                                        },
                                        false,
                                        `${current.rowIndex}.user${entityStr}$user`
                                    );
                                }
                            });
                            current.editedRow[ele].forEach((ele2: string) => {
                                if (!userRelations.includes(ele2)) {
                                    this.toggleNode(
                                        {
                                            relation: ele2,
                                            [`${entity}Id`]: entityId,
                                        },
                                        true,
                                        `${current.rowIndex}.user${entityStr}$user`
                                    );
                                }
                            });
                            this.execute('grant');
                        } else {
                            this.setUpdateData(
                                `${0}.${ele}`,
                                current.editedRow[ele]
                            );
                            this.execute('update');
                        }
                    });
                }
                this.updateEditRowKey((this as any).currentSaveId);
            }
        },
        onRowEdit(params: any) {
            const { row, col, value } = params;
            (this as any).editMap[row.id] = {
                ...params,
                editedRow: { [col.colKey]: value },
            };
        },
    },
});
