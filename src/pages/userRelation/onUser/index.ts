import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../utils/extraFile';

export default OakPage({
    entity: 'user',
    projection: async ({ props }) => {
        const { entity, relations, entityId } = props;
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
                    relation: {
                        $in: relations!,
                    },
                    [`${entity}Id`]: entityId!,
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
    ],
    isList: true,
    formData: async function ({ data: users, props, features }) {
        const { entity } = props;
        const entityStr = firstLetterUpperCase(entity!);
        const filter = this.state.oakFullpath && await this.getFilterByName('name') as any;

        return {
            users: users?.map((ele: any) => {
                const { mobile$user, extraFile$entity } = ele || {};
                const userEntity = ele![`user${entityStr}$user`];
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const avatar =
                    extraFile$entity &&
                    extraFile$entity[0] &&
                    composeFileUrl(extraFile$entity[0]);
                const relations = userEntity?.map((ele: any) => ele.relation);
                const hasRelation: boolean[] = props.relations!.map((ele2) =>
                    relations.includes(ele2)
                );
                const user2 = Object.assign({}, ele, {
                    mobile,
                    avatar,
                    relations,
                    hasRelation,
                });
                return user2;
            }),
            searchValue:
                filter?.$or &&
                (filter.$or as [{ name: { $includes: string } }])[0]?.name
                    .$includes,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
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
        onChange(input: any) {
            const { dataset, value } = this.resolveInput(input);
            const {
                id: userId,
                relation,
                index,
            } = dataset as {
                id: string;
                relation: string;
                index: number;
            };
            this.onChangeValue(value, relation, index);
        },
        onChangeValue(value: boolean, relation: string, index: number) {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            this.toggleNode(
                {
                    relation,
                    [`${entity}Id`]: entityId,
                },
                value,
                `${index}.user${entityStr}$user`
            );
        },
        async confirm() {
            await this.execute('grant');
            await this.navigateBack();
        },
    },
});
