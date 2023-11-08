import { assert } from 'oak-domain/lib/utils/assert';
export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relationEntity: 1,
        relationEntityFilter: 1,
        relationIds: 1,
        type: 1,
        multiple: 1,
        rule: 1,
        ruleOnRow: 1,
        remark: 1,
        granterId: 1,
        qrCodeType: 1,
    },
    isList: false,
    properties: {
        entity: '',
        entityId: '',
        relationEntity: '',
        relationEntityFilter: {},
        relationIds: [],
        type: 'grant',
        redirectToAfterConfirm: {},
        claimUrl: '',
        qrCodeType: '',
        multiple: false,
        rule: 'single',
        ruleOnRow: 'single',
    },
    lifetimes: {
        ready() {
            this.setInit();
        },
    },
    methods: {
        setPeriod(period) {
            this.setState({
                period,
            });
        },
        setInit() {
            const userId = this.features.token.getUserId();
            const { entity, entityId, relationEntity, relationEntityFilter, relationIds, type, redirectToAfterConfirm, qrCodeType, claimUrl, multiple, rule, ruleOnRow, } = this.props;
            this.setState({
                userEntityGrantId: '',
            });
            if (this.isCreation()) {
                this.update({
                    entity,
                    entityId,
                    relationEntity,
                    relationEntityFilter,
                    relationIds,
                    type: type || 'grant',
                    multiple,
                    rule: rule || 'single',
                    ruleOnRow: ruleOnRow || 'single',
                    granterId: userId,
                    redirectTo: redirectToAfterConfirm,
                    qrCodeType: qrCodeType,
                    claimUrl,
                });
                // this.setState({
                //     userEntityGrantId: '',
                // });
            }
        },
        async confirm() {
            const { period, unit, userEntityGrant } = this.state;
            const time = period * 24 * 60 * 60 * 1000;
            const expiresAt = Date.now() + time;
            if (!period) {
                this.setMessage({
                    type: 'error',
                    content: '请选择',
                });
                return;
            }
            this.update({
                expiresAt,
            });
            assert(!this.props.oakId);
            const id = this.getId();
            await this.execute();
            // set了这个值就在页面显示二维码
            this.setState({
                userEntityGrantId: id,
            });
        },
    },
});
