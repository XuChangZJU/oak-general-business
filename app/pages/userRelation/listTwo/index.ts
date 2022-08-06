import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';
import React from '../../../utils/react';

export default OakPage({
    path: 'userRelation:list',
    entity: 'user',
    projection: async ({ props }) => {
        const { entity, entityId, relation } = props;
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
    formData: async function ({ data: users, props, features }) {
        const { entity } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const filter = await this.getFilterByName('name');
        return {
            users: users?.map((ele: any) => {
                const { mobile$user, extraFile$entity } = ele || {};
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const relations = ele[`user${entityStr}$user`]?.map(
                    (ele) => ele.relation
                );
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
        editableRowKeys: [],
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
                this.tableRef = React.createRef();
                this.editMap = {};
                this.currentSaveId = '';
            }
        },
    },
    methods: {
        onActionSelect(e: any) {
            const { index, selected } = e.detail;
            const { entity, entityId, relations } = this.props;

            switch (index) {
                case 0: {
                    this.navigateTo({
                        url: '/userEntityGrant/grant',
                        entity,
                        entityId,
                        relations,
                    });
                }
                case 1: {
                    this.navigateTo({
                        url: '/userRelation/upsert',
                        entity,
                        entityId,
                        relations,
                    });
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
        goDetail(id) {
            const { relations, entity, entityId } = this.props;
            this.navigateTo({
                url: '/userRelation/detail2',
                oakId: id,
                relations,
                entity,
                entityId,
            });
        },
        goUpsert() {
            const { entity, entityId, relations } = this.props;
            if (process.env.OAK_PLATFORM === 'web') {
                this.navigateTo({
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                    relations,
                });
            } else {
                this.setState({
                    visible: true,
                });
            }
        },
        goUserEntityGrantWithGrant() {
            const { entity, entityId, relations } = this.props;
            this.navigateTo({
                url: '/userEntityGrant/grant',
                entity,
                entityId,
                relations,
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
        //web table methods
        onEdit(e) {
            const { editableRowKeys } = this.state;

            const { id } = e.currentTarget.dataset;
            if (!editableRowKeys.includes(id)) {
                this.setState({
                    editableRowKeys: editableRowKeys.concat(id),
                });
            }
        },
        updateEditRowKey(id) {
            const { editableRowKeys } = this.state;
            const index = editableRowKeys.findIndex((t) => t === id);
            editableRowKeys.splice(index, 1);
            this.setState({
                editableRowKeys: [...editableRowKeys],
            });
        },
        onSave(e) {
            const { id } = e.currentTarget.dataset;
            this.currentSaveId = id;
            // 触发内部校验，而后在 onRowValidate 中接收异步校验结果
            this.tableRef.current.validateRowData(id);
        },
        onCancel(e) {
            const { id } = e.currentTarget.dataset;
            this.updateEditRowKey(id);
            this.tableRef.current.clearValidateData();
        },
        onRowValidate(params) {
            if (params.result.length) {
                const r = params.result[0];
                this.setMessage({
                    type: 'error',
                    context: `${r.col.title} ${r.errorList[0].message}`,
                });
                return;
            }
            // 如果是 table 的父组件主动触发校验
            if (params.trigger === 'parent' && !params.result.length) {
                const { users } = this.state;
                const { entity, entityId } = this.props;
                const entityStr = firstLetterUpperCase(entity!);

                const current = this.editMap[this.currentSaveId];
                if (current) {
                    Object.keys(current.editedRow).forEach((ele) => {
                        if (ele === 'relations') {
                            const userRelations =
                                users[current.rowIndex].relations;
                            userRelations.forEach((ele2) => {
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
                            current.editedRow[ele].forEach((ele2) => {
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
                this.updateEditRowKey(this.currentSaveId);
            }
        },
        onRowEdit(params) {
            const { row, col, value } = params;
            this.editMap[row.id] = {
                ...params,
                editedRow: { [col.colKey]: value },
            };
        },
    },
});
