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
                
            }
        },
    }
);
