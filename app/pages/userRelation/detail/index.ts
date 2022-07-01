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
        isList: false,
        formData: async function ({ data: user, params }) {
            const { entity, relations } = params!;
            const entityStr = entity.charAt(0).toUpperCase() + entity.substring(1);
            const userRelation = user![`user${entityStr}$user`];
            const relationArr = (userRelation as any)?.map((ele: any) => ele.relation) || [];
            const relationList = JSON.parse(relations) as Array<string>;
            const relationArr2: [string, boolean][] = [];
            relationList.forEach(ele => {
                relationArr2.push([ele, relationArr.includes(ele) ? true : false]);
            })
            const { extraFile$entity } = user || {};
            const avatar = extraFile$entity![0] && composeFileUrl(extraFile$entity![0]);
            return Object.assign(user!, {
                relationArr,
                relationArr2,
                avatar,
            })
        },
        properties: {
            entity: String,
            entityId: String,
            relations: String,
        },
        data: {
            show: false,
            relationArr2: [],
        },
        lifetimes: {
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
