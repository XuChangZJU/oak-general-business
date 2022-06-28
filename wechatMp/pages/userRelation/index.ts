import { composeFileUrl } from '../../../src/utils/extraFile';
OakPage(
    {
        path: 'userRelation:list',
        entity: 'user',
        projection: (data) => {
            const { entity } = data;
            const entityStr = entity.charAt(0).toUpperCase() + entity.subString(1);
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
                        entityId: 1,
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
            }
        },
        filters: [
            {
                filter: async ({ features, rest: params }) => {
                    const { entityId, relations, entity } = params;
                    const entityStr = entity.charAt(0).toUpperCase() + entity.subString(1);
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
                    };
                },
            },
        ],
        isList: true,
        formData: async function ({ data: users, params }) {
            const { entity } = params!;
            const entityStr = entity.charAt(0).toUpperCase() + entity.subString(1);

            const filters = await this.getFilters();
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
            };
        },
        properties: {
            entity: String,
            entityId: String,
            relations: String,
        },
        data: {},
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
            goUpsert() {
                const { entity, entityId } = this.props;
                console.log(entity, entityId);
                this.navigateTo({
                    url: '../userEntityGrant/grant/index',
                    entity,
                    entityId,
                    relations: ['manager'],
                    type: 'grant',
                });
            },
        },
    }
);
