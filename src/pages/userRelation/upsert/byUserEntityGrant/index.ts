import assert from 'assert';
import { WechatMpConfig } from '../../../../entities/Application';
import { EntityDict } from '../../../../general-app-domain';
import { QrCodeType } from '../../../../types/Config';

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
        qrCodeType: 1,
    },
    isList: false,
    formData: ({ data: userEntityGrant }) => ({
        userEntityGrant,
    }),
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
        type: 'grant',
        redirectToAfterConfirm: {} as EntityDict['userEntityGrant']['Schema']['redirectTo'],
        qrCodeType: '' as QrCodeType,
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
            const {
                config,
                system,
            } = app!;
            const { config: systemConfig } = system!;
            const { userEntityGrantId } = this.state;
            const imageUrl = (systemConfig && systemConfig?.App?.mpShareImageUrl) ||
                '';
            return {
                title: '',
                path: `/pages/userEntityGrant/confirm/index?oakId=${userEntityGrantId}`,
                imageUrl,
            };
        },
        setInit() {
            const {
                entity,
                entityId,
                type,
                redirectToAfterConfirm,
                qrCodeType,
            } = this.props;
            this.update({
                entity,
                entityId,
                type: (type as 'grant') || 'grant',
                number: 1,
                redirectTo: redirectToAfterConfirm as EntityDict['userEntityGrant']['Schema']['redirectTo'],
                qrCodeType: qrCodeType as QrCodeType,
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