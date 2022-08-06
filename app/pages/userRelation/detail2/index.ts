import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { composeFileUrl } from "../../../../src/utils/extraFile";

export default OakPage({
    path: 'userRelation:detail',
    entity: 'user',
    projection: async ({ props }) => {
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
    formData: async ({ data: user, props }) => {
        const { entity, relations } = props;
        const relations2 =
            typeof relations === 'object'
                ? relations
                : relations && JSON.parse(relations);
        const entityStr = firstLetterUpperCase(entity!);
        const relationArr: Array<any> = [];
        const {
            id,
            nickname,
            idState,
            userState,
            name,
            mobile$user,
            extraFile$entity,
        } = user || {};
        let userRelations =
            user && (user[`user${entityStr}$user`] as Array<any>);
        userRelations = userRelations?.map((ele) => ele.relation);
        relations2?.forEach((ele) => {
            relationArr.push({
                checked: userRelations.includes(ele),
                value: ele,
            });
        });
        const mobile = mobile$user && mobile$user[0]?.mobile;
        const avatar =
            extraFile$entity &&
            extraFile$entity[0] &&
            composeFileUrl(extraFile$entity[0]);
        return {
            id,
            nickname,
            name,
            mobile,
            avatar,
            userState,
            idState,
            relationArr,
        };
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: '',
        },
    },
    methods: {
        onChange(event: any) {
            const { value } = event.currentTarget.dataset;
            const { checked } = event.detail;
            this.onChangeValue(value, checked);
        },
        onChangeValue(value, checked) {
            const { entity, entityId } = this.props;
            const entityStr = firstLetterUpperCase(entity!);
            const nodeData = {
                [`${entity}Id`]: entityId,
                relation: value,
            };
            this.toggleNode(nodeData, checked, `user${entityStr}$user`);
        },
        async onConfirm() {
            await this.execute('grant');
            await this.navigateBack();
        },
    },
});
