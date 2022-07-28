import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { composeFileUrl } from "../../../../src/utils/extraFile";

export default OakPage(
    {
        path: 'userRelation:upsert',
        entity: 'user',
        projection: async ({ props }) => {
            const { entity, entityId, relation } = props;
            const entityStr = firstLetterUpperCase(entity!);
            return {
                id: 1,
                name: 1,
                password: 1,
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
            };
        },
        isList: false,
        formData: async ({ data: user, props }) => {
            const { entity, relations } = props;
            const {
                id,
                name,
                mobile$user,
                password,
            } = user || {};
            const mobile = mobile$user && mobile$user[0]?.mobile;
            return {
                id,
                name,
                mobile,
                password,
            };
        },
        properties: {
            entity: String,
            entityId: String,
            relations: Array,
        },
        data: {
            mobile: '',
            relationArr: [],
        },
        methods: {
            setValue(input: any) {
                const { dataset, value, Context } = this.resolveInput(input);
                this.setUpdateData(dataset!.attr, value);
            },
            onMobileChange(event:any) {
                const { value } = event.detail;
                this.setState({
                    mobile: value,
                })
                this.setUpdateData('mobile$user.0.mobile', value);
            },
            onCheckBoxChange(event: any) {
                const { entity, entityId, relations } = this.props;
                const entityStr = firstLetterUpperCase(entity!);
                const { value } = event.detail as { value: Array<string> };
                const { relationArr } = this.state;
                //由于是根据index 进行删除, 所以将之前设置的node从头开始删除
                relationArr.forEach((ele, index) => {
                    this.removeNode(`user${entityStr}$user`, 0);
                })
                value.forEach((ele, index) => {
                    this.setUpdateData(`user${entityStr}$user.${index}.${entity}Id`, entityId);
                    this.setUpdateData(`user${entityStr}$user.${index}.relation`, ele);
                })
                this.setState({
                    relationArr: value,
                })
            },
            async onConfirm() {
                await this.execute('create');
                this.navigateBack();
            },        
        },
    }
);
