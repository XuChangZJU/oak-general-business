import assert from 'assert';
import { WechatMpConfig } from '../../../../entities/Application';
import { EntityDict } from '../../../../oak-app-domain';
import { QrCodeType } from '../../../../types/Config';

type Unit = 'minute' | 'hour' | 'day';

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
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as EntityDict['relation']['OpSchema'][],
        type: 'grant' as EntityDict['userEntityGrant']['Schema']['type'],
        redirectToAfterConfirm:
            {} as EntityDict['userEntityGrant']['Schema']['redirectTo'],
        qrCodeType: '' as QrCodeType,
    },
    data: {
        period: 15,
        userEntityGrantId: '',
        unit: 'minute' as Unit,
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
        onShareAppMessage(e: any) {
            const app = this.features.application.getApplication();
            const { config, system } = app!;
            const { config: systemConfig } = system!;
            const { userEntityGrantId } = this.state;
            const imageUrl =
                (systemConfig && systemConfig?.App?.mpShareImageUrl) || '';
            return {
                title: '',
                path: `/pages/userEntityGrant/confirm/index?oakId=${userEntityGrantId}`,
                imageUrl,
            };
        },
        setInit() {
            const userId = this.features.token.getUserId();
            const {
                entity,
                entityId,
                type,
                redirectToAfterConfirm,
                qrCodeType,
            } = this.props;
            this.update({
                confirmed: 0,
                entity,
                entityId,
                type: type || 'grant',
                number: 1,
                granterId: userId,
                redirectTo:
                    redirectToAfterConfirm as EntityDict['userEntityGrant']['Schema']['redirectTo'],
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
                relationId: value,
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
        setUnit(u: Unit) {
            const { defaultPeriods } = this.state;
            this.setState({ unit: u });
            this.setPeriod(defaultPeriods[u as Unit]);
        },
        setUnitMp(e: any) {
            const { unitArr } = this.state;
            const { value } = e.detail;
            const unitObj = unitArr[value];
            this.setState({
                unitIndex: value,
            });
            this.setUnit(unitObj.value as Unit);
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