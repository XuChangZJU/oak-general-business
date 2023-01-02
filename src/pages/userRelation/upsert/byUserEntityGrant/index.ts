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
        redirectToAfterConfirm: Object,
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
        onShareAppMessage(e: any) {
            const app = this.features.application.getApplication();
            const { config, system: { config: systemConfig } } = app;
            const { userEntityGrantId } = this.state;
            const imageUrl = config && config.App?.mpShareImageUrl || systemConfig && systemConfig?.App?.mpShareImageUrl || '';
            const { redirectToAfterConfirm } = this.props;
            return {
                title: '',
                path: `/pages/userEntityGrant/confirm/index?oakId=${userEntityGrantId}`,
                imageUrl,
            }
        },
        setInit() {
            const { entity, entityId, type, redirectToAfterConfirm } = this.props;
            this.update({
                entity,
                entityId,
                type: type || 'grant',
                number: 1,
                redirectTo: redirectToAfterConfirm,
            });
            this.setState({
                userEntityGrantId: '',
            });
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                wx.hideShareMenu();
            }
        },
        setRelation(value: any) {
            this.update({
                relation: value,
            });
        },
        setRelationMp(e: any) {
            const { currentKey } = e.detail;
            this.setRelation(currentKey);
        },
        setNumber(value: number) {
            this.update({
                number: value,
            });
        },
        setNumberMp(e: any) {
            const { currentKey } = e.detail;
            this.setNumber(parseInt(currentKey, 10));
        },
        setPeriod(p: number) {
            this.setState({ period: p });
        },
        setPeriodMp(e: any) {
            const { count } = e.detail;
            this.setPeriod(count);
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