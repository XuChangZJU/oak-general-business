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
    formData: ({ data: userEntityGrant }) => ({
        userEntityGrant,
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
            this.update({
                entity,
                entityId,
                type: type || 'grant',
                number: 1,
            });
        },
        setRelation(value: any) {
            this.update({
                relation: value,
            });
        },
        setNumber(value: number) {
            this.update({
                number: value,
            });
        },
        onBack() {
            this.navigateBack();
        },
        async confirm() {
            const { period } = this.state;
            const expiresAt = Date.now() + period * 60 * 1000;
            this.update({
                expiresAt,
            });

            assert(!this.props.oakId);
            const id = this.getId();
            await this.execute();
            // todo 在页面显示二维码 先弹窗方式吧
            this.setState({
                userEntityGrantId: id,
            });
        },
    },
});