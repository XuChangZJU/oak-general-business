import { OakCongruentRowExists } from "oak-domain/lib/types";
export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relationId: 1,
        relation: {
            id: 1,
            name: 1,
            display: 1,
        },
        type: 1,
        qrCodeType: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
    },
    isList: false,
    formData: ({ data: userEntityGrant }) => ({
        ...(userEntityGrant || {}),
    }),
    properties: {
        entity: '',
        entityId: '',
        relations: [],
        type: '',
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
            this.update({
                entity,
                entityId,
                type: type || 'grant',
                number: 1,
            });
        },
        setRelationId(value) {
            this.update({
                relationId: value,
            });
        },
        setNumber(value) {
            this.update({
                number: value,
            });
        },
        setPeriod(value) {
            this.update({
                period: value,
            });
        },
        onBack() {
            this.navigateBack();
        },
        reset() {
            this.setState({
                period: 5,
            });
            this.clean();
        },
        async confirm() {
            try {
                const { period } = this.state;
                const expiresAt = Date.now() + period * 60 * 1000;
                const id = this.getId();
                this.update({
                    expiresAt,
                });
                await this.execute();
                this.navigateTo({
                    url: '/userEntityGrant/detail',
                    oakId: id,
                });
            }
            catch (error) {
                if (error.constructor.name ===
                    OakCongruentRowExists.name) {
                    // 这里由于编译的问题，用instanceof会不通过检查
                    const data = error.getData();
                    this.redirectTo({
                        url: '/userEntityGrant/detail',
                        oakId: data.id,
                    });
                }
            }
        },
    },
});
