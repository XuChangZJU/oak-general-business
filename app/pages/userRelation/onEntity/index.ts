import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';

export default OakPage(
    {
        path: 'userRelation:detail',
        entity: 'user',
        projection: async ({ props }) => {
            const { entity, entityIds, nameExpression, relations } = props;
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
                        [`${entity}Id`]: {
                            $in: entityIds,
                        },
                        relation: {
                            $in: relations!,
                        }
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
        isList: false,
        formData: async function ({ data: user, props }) {
            const { entity, entityIds, relations } = props;
            const entityStr = firstLetterUpperCase(entity!);
            const { name, nickname, mobile, [`user${entityStr}$user`]: relationRows, extraFile$entity } = user!;
            // entity按id聚集
            const { entityRows } = this.state;
            const entityRowData = entityIds!.map(
                (id) => ({
                    id,
                    name: entityRows.find(ele => ele.id === id)?.$expr,
                    relations: (relationRows as {
                        relation: string;
                        [A: string]: string;
                    }[]).filter(
                        ele => ele[`${entity}Id`] === id
                    ).map(
                        ele => ele.relation
                    )
                })
            );
            const avatar = (extraFile$entity![0] && composeFileUrl(extraFile$entity![0])) as string;
            return {
                name,
                nickname,
                avatar,
                entityRowData,
                mobile,
                singleRelation: relations!.length === 1,
            }
        },
        properties: {
            entity: String,
            entityIds: Array,
            nameExpression: Object,
            relations: Array,
        },
        data: {
            entityRows: [] as any[],
        },
        methods: {
            async onLoad() {
                const { nameExpression, entity, entityIds } = this.props;
                const entityRows = await this.features.cache.get(entity as any, {
                    data: {
                        id: 1,
                        $expr: nameExpression,
                    },
                    filter: {
                        id: {
                            $in: entityIds,
                        }
                    }
                });
                this.setState({
                    entityRows,
                });
            },
        },
    }
);
