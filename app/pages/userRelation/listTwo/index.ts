import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';
import React from '../../../utils/react';
export default OakPage(
    {
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
                                }
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
                    const { mobile$user, extraFile$entity, [`user${entityStr}$user`]: userEntities  } =
                        ele || {};
                    const mobile = mobile$user && mobile$user[0]?.mobile;
                    const avatar =
                        extraFile$entity &&
                        extraFile$entity[0] &&
                        composeFileUrl(extraFile$entity[0]);
                    const user2 = Object.assign({}, ele, {
                        mobile,
                        avatar,
                        relations: userEntities,
                        hasRelation: userEntities.length > 0,
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
        },
        lifetimes: {
            created() {
                if (process.env.OAK_PLATFORM === 'web') {
                    this.tableRef = React.createRef();
                }
            }
        },
        methods: {
            goDetail(e: any) {
                const { relations, entity, entityId } = this.props;
                const { id } = e.currentTarget.dataset;
                this.navigateTo({
                    url: '/userRelation/detail2',
                    oakId: id,
                    relations,
                    entity,
                    entityId,
                })
            },
            goUpsert() {
                const { entity, entityId, relations } = this.props;
                this.navigateTo({
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                    relations,
                })
            },
            onRemove(event: any) {
                const { index } = event.target.dataset;
                this.setState({
                    show: true,
                    deleteIndex: Number(index),
                })
            },
            cancelDelete() {
                this.setState({
                    show: false,
                    deleteIndex: '',
                })
            },
            confirmDelete() {
                const { entity } = this.props;
                const entityStr = firstLetterUpperCase(entity);
                const { deleteIndex } = this.state;
                typeof deleteIndex === 'number' && this.removeNode(`user.user${entityStr}$user`, deleteIndex);
                this.setState({
                    show: false,
                    deleteIndex: '',
                })
            },
            onAdd(event: any) {
                const { entity, entityId, relation } = this.props;
                const entityStr = firstLetterUpperCase(entity);
                const { index } = event.target.dataset;
                this.toggleNode({
                    [`${entity}Id`]: entityId,
                    relation,
                }, true, `${index}.user${entityStr}$user`);
            },
            async confirm() {
                await this.execute();
                this.navigateBack();
            },
            goSearch() {
                this.navigateTo({
                    url: '/user/search',
                    toUrl: '/userRelation/detail'
                })
            }
        },
    }
);
