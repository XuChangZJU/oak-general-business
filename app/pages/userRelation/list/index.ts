import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';

export default OakPage(
    {
        path: 'userRelation:list',
        entity: 'user',
        projection: async ({onLoadOptions}) => {
            const { entity } = onLoadOptions;
            const entityStr = entity && entity.charAt(0).toUpperCase() + entity.substring(1);
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
            // 暂时注掉
            /* {
                filter: async ({ onLoadOptions }) => {
                    const { entityId, relations, entity } = onLoadOptions;
                    const entityStr = entity && entity.charAt(0).toUpperCase() + entity.substring(1);
                    const userRelationFilter = {
                        [`${entity}Id`]: entityId,
                    };
                    return {
                        id: {
                            $in: {
                                entity: `user${entityStr}`,
                                data: {
                                    userId: 1,
                                },
                                filter: userRelationFilter,
                            },
                        },
                    } as any;
                },
            }, */
        ],
        isList: true,
        formData: async function ({ data: users, props, features }) {
            const { entity } = props;
            const entityStr = firstLetterUpperCase(entity!);

            const isRoot = await features.token.isRoot();
            const filter = await this.getFilterByName('name');

            return {
                users: users?.map((ele: any) => {
                    const { mobile$user, extraFile$entity } =
                        ele || {};
                    const userEntity = ele![`user${entityStr}$user`];
                    const mobile = mobile$user && mobile$user[0]?.mobile;
                    const avatar =
                        extraFile$entity &&
                        extraFile$entity[0] &&
                        composeFileUrl(extraFile$entity[0]);
                    const relations = userEntity?.map((ele: any) => ele.relation);
                    const user2 = Object.assign({}, ele, {
                        mobile,
                        avatar,
                        relations,
                    });
                    return user2;
                }),
                searchValue: (
                    filter?.$or as [{ name: { $includes: string } }]
                )[0].name.$includes,
                isRoot,
            };
        },
        properties: {
            entity: String,
            entityIds: String,
            relations: String,
            nameExpression: String,
        },
        data: {
            searchValue: '',
        },
        lifetimes: {},
        methods: {
            async searchChange(input: any) {
                const { value } = this.resolveInput(input);
                this.addNamedFilter({
                    filter: {
                        $or: [
                            {
                                name: {
                                    $includes: value!,
                                },
                            },
                            {
                                nickname: {
                                    $includes: value!,
                                },
                            },
                        ],
                    },
                    '#name': 'name',
                });
            },
            async searchCancel() {
                this.removeNamedFilterByName('name');
            },
            async searchConfirm() {
                this.refresh();
            },
            goUpsertUser() {
                const { entity, entityIds } = this.props;
                this.navigateTo({
                    url: '../../user/manage/upsert/index',
                });
            },
            handleCardClick(event: any) {
                const { entity, entityIds, nameExpression, relations } = this.props;
                const { dataset } = this.resolveInput(event);
                const { id } = dataset!;
                this.navigateTo({
                    url: '../detail/index',
                    oakId: id,
                    entity,
                    entityIds,
                    nameExpression,
                    relations,
                });
            },
        },
    }
);
