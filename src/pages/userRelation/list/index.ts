import assert from 'assert';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../utils/extraFile';
import React from '../../../utils/react';

export default OakComponent({
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
                filter: {
                    [`${entity}Id`]: entityId,
                }
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
            filter: async ({ features, props }) => {
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
    async formData({ data: users, props, features }) {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const filter = await this.getFilterByName('name');
        const pagination = this.getPagination();
        return {
            users: users?.map((ele: any) => {
                const { mobile$user, extraFile$entity } = ele;
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
            pagination,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        userIds: Array,
        relations: Array,
    },
    data: {
        searchValue: '',
        idRemove: '',
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
        goUpsert() {
            const { entity, entityId, relations } = this.props;
            this.navigateTo(
                {
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                },
                {
                    relations,
                }
            );
        },
        goUpdate(id: string) {
            const { entity, entityId, relations } = this.props;
            this.navigateTo(
                {
                    url: '/userRelation/upsert/byUser',
                    entity,
                    entityId,
                    oakId: id,
                },
                {
                    relations,
                }
            );
        },
        onDelete(id: string) {
            this.setState({
                idRemove: id,
            });
        },
        async confirmDelete() {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            const { idRemove, users } = this.state;
            const user = users.find(
                (ele: any) => ele.id === idRemove
            );
            const relations = user[`user${entityStr}$user`];
            await this.execute({
                action: 'update',
                data: {
                    [`user${entityStr}$user`]: [
                        {
                            action: 'remove',
                            data: {},
                            filter: {
                                id: {
                                    $in: relations.map((ele: any) => ele.id),
                                },
                            },
                        }
                    ],
                },
                filter: {
                    id: idRemove,
                },
            });
            this.setState({
                idRemove: '',
            });
        },

        // 这三个函数貌似还没用上
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
    },
});
