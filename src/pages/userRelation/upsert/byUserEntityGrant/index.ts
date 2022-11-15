import assert from 'assert';
import { EntityDict } from '../../../../general-app-domain';

export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        number: 1,
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
        userEntityGrantId: '',
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
        async confirm() {
            const { period } = this.state;
            const expiresAt = Date.now() + period * 60 * 1000;
            const [operation] = await this.execute({
                action: 'create',
                data: {
                    expiresAt,
                },
            });

            assert(!this.props.oakId);
            const { data } =
                operation as EntityDict['userEntityGrant']['CreateSingle'];
            const id = data.id;
            // todo 在页面显示二维码 先弹窗方式吧
            this.setState({
                userEntityGrantId: id,
            });
        },
    },
});