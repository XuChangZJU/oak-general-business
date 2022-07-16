import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';

export default OakPage(
    {
        path: 'userRelation:manage',
        entity: 'user',
        projection: async ({ props }) => {
            const { entity } = props;
            const entityStr = firstLetterUpperCase(entity!);
            return {
                id: 1,  
                [`user${entityStr}$user`]: {
                    $entity: `user${entityStr}`,
                    data: {
                        id: 1,
                        userId: 1,
                        [`${entity}Id`]: 1,
                        relation: 1,
                    },
                    filter: {
                        [`${entity}Id`]: props.entityId!,
                    }
                },
            };
        },
        filters: [
            // 由调用者注入oakFilter
        ],
        isList: true,
        formData: async function ({ data: users, props, features }) {
            const { entity, relations } = props;
            const entityStr = firstLetterUpperCase(entity!);
            const relationMap = new Map();
            const relationArr: Array<Array<string | Array<string>>> = [];
            const userRelations: Array<any> = [];
            //构建map对象
            relations?.forEach((ele: string) => {
                relationMap.set(ele, []);
            });
            users?.forEach((ele: any) => {
                userRelations.push(...ele[`user${entityStr}$user`]);
            });
            userRelations.forEach(ele => {
                const userIds = relationMap.get(ele.relation) as Array<string>;
                userIds.push(ele.userId);
            })
            relationMap.forEach((value, key) => {
                relationArr.push([key, value])
            })
            return {
                relationArr,
                relationMap
            };
        },
        properties: {
            entity: String,
            entityId: String,
            relations: Array,
        },
        data: {
            show: false,
        },
        lifetimes: {},
        methods: {
            handleClick(e: any) {
                const { entity } = this.props;
                const { ids } = e.currentTarget.dataset;
                this.navigateTo({
                    url: '/userRelation/list',
                    entity,
                    userIds: ids,
                })
            },
            
        },
    }
);
