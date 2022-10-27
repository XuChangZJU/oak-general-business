import assert from 'assert';
import { OakInputIllegalException } from 'oak-domain/lib/types';
import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { EntityDict as BaseEntityDict } from '../../../../general-app-domain';

export default OakComponent({
    entity: 'user',
    projection: async ({ props }) => {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        return {
            id: 1,
            name: 1,
            password: 1,
            nickname: 1,
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
        };
    },
    isList: false,
    async formData({ data: user, props }) {
        const { entity, entityId } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const { name, nickname, password } = user || {};
        const userRelations = user && user[`user${entityStr}$user`] as Array<{
            id: string;
            userId: string;
            relation: string;
        }>;
        return {
            password,
            userRelations,
            name,
            nickname,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    lifetimes: {
        async ready() {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            if (!this.props.oakId) {
                await this.addOperation({
                    action: 'create',
                    data: {
                        id: await generateNewId(),
                        password: '12345678',       // todo 改成system config里的默认密码
                    },
                }, async () => {
                    const operations = await this.getOperations();
                    const [ operation ] = operations as BaseEntityDict['user']['CreateSingle'][];
                    if (!operation.data.name) {
                        throw new OakInputIllegalException('user', ['name'], '用户姓名不能为空');
                    }
                    if ((operation.data as any)[`user${entityStr}$user`]?.length > 0) {
                        return;
                    }
                    throw new OakInputIllegalException('user', [`user${entityStr}$user`], '需要至少选择一个权限');
                });
            }
            else {
                await this.addOperation({
                    action: 'update',
                    data: {}
                }, async () => {
                    const operations = await this.getOperations();
                    const [ operation ] = operations as BaseEntityDict['user']['CreateSingle'][];

                    if ((operation.data as any)[`user${entityStr}$user`]?.length > 0) {
                        return;
                    }
                    throw new OakInputIllegalException('user', [`user${entityStr}$user`], '需要至少选择一个权限');
                });
            }
        },
    },
    methods: {
        async onRelationChange(value: string[]) {
            const { entity, entityId, oakId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            const { userRelations } = this.state;
            if (userRelations!.length > value.length) {
                assert(userRelations!.length === value.length + 1);
                // 删除一个relation
                const toBeRemoved = userRelations!.find(
                    (ele: any) => !value.includes(ele.relation)
                );
                assert(userRelations!.length === value.length + 1);
                this.addOperation({
                    action: oakId ? 'update' : 'create',
                    data: {
                        [`user${entityStr}$user`]: [{
                            action: 'remove',
                            data: {},
                            filter: {
                                id: toBeRemoved!.id,
                            },
                        }],
                    } ,
                });
            }
            else {
                // 增加一个relation
                assert(userRelations!.length === value.length - 1);
                const toBeInserted = value.find(
                    ele => !userRelations!.find(
                        (userRelation: any) => userRelation.relation === ele
                    )
                );
                this.addOperation({
                    action: oakId ? 'update' : 'create',
                    data: {
                        [`user${entityStr}$user`]: [{
                            action: 'create',
                            data: {
                                id: await generateNewId(),
                                [`${entity}Id`]: entityId,
                                relation: toBeInserted,
                            },
                        }],
                    },
                });
            }
        },
        async onConfirm() {
            await this.execute();
        },
    },
});
