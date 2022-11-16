import { DeduceCreateSingleOperation, OakException, OakCongruentRowExists } from "oak-domain/lib/types";
import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity: 'userEntityGrant',

    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
    },
    isList: false,
    formData: async ({ data: userEntityGrant }) => ({
        ...userEntityGrant,
    }),
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
        type: String,
    },
    data: {
        period: 5,
    },
    lifetimes: {
        ready() {
            this.setInit();
        },
    },
    methods: {
        setInit() {
            const { entity, entityId, type } = this.props;
            this.setMultiAttrUpdateData({
                entity,
                entityId,
                type: type || 'grant',
                number: 1,
            });
        },
        setRelation(value: any) {
            this.setUpdateData('relation', value);
        },
        setNumber(value: number) {
            this.setUpdateData('number', value);
        },
        onBack() {
            this.navigateBack();
        },
        reset() {
            this.setState({
                period: 5,
            });
            this.cleanOperation();
        },
        async confirm() {
            try {
                const { period } = this.state;
                const expiresAt = Date.now() + period * 60 * 1000;
                const [operation] = await this.execute({
                    action: 'create',
                    data: {
                        expiresAt,
                    },
                });

                const { data } =
                    operation as EntityDict['userEntityGrant']['CreateSingle'];
                const id = data.id;

                this.navigateTo({
                    url: '/userEntityGrant/detail',
                    oakId: id,
                });
            } catch (error) {
                if (
                    (<OakException>error).constructor.name ===
                    OakCongruentRowExists.name
                ) {
                    // 这里由于编译的问题，用instanceof会不通过检查
                    const data = (<
                        OakCongruentRowExists<EntityDict, 'userEntityGrant'>
                    >error).getData();
                    this.redirectTo({
                        url: '/userEntityGrant/detail',
                        oakId: data.id,
                    });
                }
            }
        },
    },
});