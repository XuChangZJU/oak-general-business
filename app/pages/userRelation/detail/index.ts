import { composeFileUrl } from '../../../../src/utils/extraFile';

OakPage(
    {
        path: 'userRelation:detail',
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
            };
        },
        isList: false,
        formData: async function ({ data: user, params }) {
            const { entity } = params!;
            const entityStr = entity.charAt(0).toUpperCase() + entity.substring(1);
            const userRelation = user![`user${entityStr}$user`];
            const relations = userRelation?.map((ele: any) => ele.relation);
            const { extraFile$entity } = user || {};
            const avatar = extraFile$entity![0] && composeFileUrl(extraFile$entity[0]);
            return Object.assign(user, {
                relations,
                avatar,
            })
        },
        properties: {
            entity: String,
            entityId: String,
            relations: String,
        },
        data: {},
        lifetimes: {},
        methods: {
            goRelationUpsert() {}
        },
    }
);
