import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';

OakPage(
    {
        path: 'userRelation:detail',
        entity: 'user',
        projection: async ({onLoadOptions}) => {
            const { entity, entityIds, nameExpression, relations } = onLoadOptions;
            const entityStr = firstLetterUpperCase(entity!);
            const entityIds2 = JSON.parse(entityIds!) as string[];
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
                            $in: entityIds2,
                        },
                        relation: {
                            $in: JSON.parse(relations!),
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
            const { entity, relations, entityIds } = props;
            const entityStr = firstLetterUpperCase(entity!);
            const { name, nickname, mobile, [`user${entityStr}$user`]: relationRows, extraFile$entity } = user!;
            // entity按id聚集
            const entityIds2 = JSON.parse(entityIds!) as string[];
            const entityRows = entityIds2.map(
                (id, idx) => ({
                    id,
                    name: entityNames[idx],
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
            const avatar = extraFile$entity![0] && composeFileUrl(extraFile$entity![0]);
            return {
                name,
                nickname,
                avatar,
                relations,
                entityRows,
                mobile,
            }
        },
        properties: {
            entity: String,
            entityIds: String,
            nameExpression: String,
            relations: String,
            entityNames: String,
        },
        data: {
            show: false,
            relationArr2: [],
        },
        methods: {
            handleShow() {
                this.setState({
                    show: true,
                });
            },
            onChangeTap(input: WechatMiniprogram.Touch) {
                const { key, checked } = this.resolveInput(input, ['key', 'checked']);
                const { relationArr2 } = this.state;
                relationArr2.forEach((ele: any) => {
                    if (ele[0] === key) {
                        ele[1] = checked;
                    }
                })
                this.setState({
                    relationArr2
                })
            },
        },
    }
);
