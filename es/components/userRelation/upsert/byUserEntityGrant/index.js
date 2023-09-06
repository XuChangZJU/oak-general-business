import { assert } from 'oak-domain/lib/utils/assert';
export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relationId: 1,
        type: 1,
        number: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
        qrCodeType: 1,
    },
    isList: false,
    formData: ({ data: userEntityGrant }) => ({
        userEntityGrant,
    }),
    properties: {
        entity: '',
        entityId: '',
        relations: [],
        type: 'grant',
        redirectToAfterConfirm: {},
        qrCodeType: '',
    },
    data: {
        period: 15,
        userEntityGrantId: '',
        unit: 'minute',
        maxes: {
            minute: 3 * 24 * 60,
            hour: 3 * 24,
            day: 3,
        },
        defaultPeriods: {
            minute: 15,
            hour: 1,
            day: 1,
        },
        unitArr: [
            {
                label: '分钟',
                value: 'minute',
            },
            {
                label: '小时',
                value: 'hour',
            },
        ],
        unitIndex: 0,
    },
    lifetimes: {
        ready() {
            this.setInit();
        },
    },
    methods: {
        onShareAppMessage(e) {
            const app = this.features.application.getApplication();
            const { config, system } = app;
            const { config: systemConfig } = system;
            const { userEntityGrantId } = this.state;
            const imageUrl = (systemConfig && systemConfig?.App?.mpShareImageUrl) || '';
            return {
                title: '',
                path: `/pages/userEntityGrant/confirm/index?oakId=${userEntityGrantId}`,
                imageUrl,
            };
        },
        setInit() {
            const userId = this.features.token.getUserId();
            const { entity, entityId, type, redirectToAfterConfirm, qrCodeType, } = this.props;
            this.update({
                confirmed: 0,
                entity,
                entityId,
                type: type || 'grant',
                number: 1,
                granterId: userId,
                redirectTo: redirectToAfterConfirm,
                qrCodeType: qrCodeType,
            });
            this.setState({
                userEntityGrantId: '',
            });
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                wx.hideShareMenu();
            }
        },
        setRelation(value) {
            this.update({
                relationId: value,
            });
        },
        setRelationMp(e) {
            const { currentKey } = e.detail;
            this.setRelation(currentKey);
        },
        setNumber(value) {
            this.update({
                number: value,
            });
        },
        setNumberMp(e) {
            const { currentKey } = e.detail;
            this.setNumber(parseInt(currentKey, 10));
        },
        setPeriod(p) {
            this.setState({ period: p });
        },
        setPeriodMp(e) {
            const { count } = e.detail;
            this.setPeriod(count);
        },
        setUnit(u) {
            const { defaultPeriods } = this.state;
            this.setState({ unit: u });
            this.setPeriod(defaultPeriods[u]);
        },
        setUnitMp(e) {
            const { unitArr } = this.state;
            const { value } = e.detail;
            const unitObj = unitArr[value];
            this.setState({
                unitIndex: value,
            });
            this.setUnit(unitObj.value);
        },
        onBack() {
            this.navigateBack();
        },
        async confirm() {
            const { period, unit, userEntityGrant } = this.state;
            if (!userEntityGrant?.relationId) {
                this.setMessage({
                    type: 'error',
                    content: '请选择角色权限',
                });
                return;
            }
            let time = 0;
            switch (unit) {
                case 'hour': {
                    time = period * 60 * 60 * 1000;
                    break;
                }
                case 'day': {
                    time = period * 24 * 60 * 60 * 1000;
                    break;
                }
                default: {
                    if (unit === 'minute') {
                        time = period * 60 * 1000;
                    }
                    else {
                        this.setMessage({
                            type: 'error',
                            content: '请选择过期时长单位',
                        });
                        return;
                    }
                    break;
                }
            }
            const expiresAt = Date.now() + time;
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
            // 小程序显示可分享菜单
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                wx.showShareMenu({});
            }
        },
    },
});
