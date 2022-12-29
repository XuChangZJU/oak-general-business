import assert from 'assert';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../../../general-app-domain';
import { composeFileUrl } from '../../../utils/extraFile';
import React from '../../../utils/react';

export default OakComponent({
    entity: 'user',
    projection: ({ props }) => {
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
        } as EntityDict['user']['Selection']['data'];
    },
    filters: [
        // 由调用者注入oakFilter
        {
            filter: ({ features, props }) => {
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
    formData({ data: users, props, features }) {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const filter = this.getFilterByName('fulltext');
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
            searchValue: filter?.$text && filter.$text.$search,
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
        async confirmDelete(idRemove: string) {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            const { users } = this.state;
            const user = users.find(
                (ele: any) => ele.id === idRemove
            );
            const relations = user[`user${entityStr}$user`];
            this.updateItem({
                [`user${entityStr}$user`]: [
                    {
                        id: generateNewId(),
                        action: 'remove',
                        data: {},
                        filter: {
                            id: {
                                $in: relations.map((ele: any) => ele.id),
                            },
                        },
                    }
                ]
            }, idRemove);
            await this.execute();
        },

        async searchChangeMp(event: WechatMiniprogram.Input) {
           const { value } = event.detail;
            this.addNamedFilter({
                filter: {
                    $text: {
                        $search: value,
                    },
                },
                '#name': 'fulltext',
            });
        },

        async searchCancelMp() {
            this.removeNamedFilterByName('fulltext', true);
        },

        async searchConfirmMp() {
            this.refresh();
        },
    },
});
