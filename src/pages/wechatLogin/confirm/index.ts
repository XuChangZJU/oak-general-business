import { EntityDict } from '../../../general-app-domain';
import { WebConfig } from "../../../entities/Application";


export default OakComponent({
    entity: 'wechatLogin',
    projection: {
        id: 1,
        expired: 1,
        expiresAt: 1,
        userId: 1,
        type: 1,
        qrCodeType: 1,
        successed: 1,
    },
    isList: false,
    formData({ data: wechatLogin, features }) {
        const loginUserId = features.token.getUserId(true);
        const user = wechatLogin?.user;
        const userId = wechatLogin?.userId;
        const type = wechatLogin?.type;
        const application = features.application.getApplication();
        const appId = (application?.config as WebConfig | undefined)?.wechat
            ?.appId;
        return {
            type,
            userId,
            expired: wechatLogin?.expired,
            expiresAt: wechatLogin?.expiresAt,
            successed: wechatLogin?.successed,
            loginUserId,
            appId,
        };
    },
    listeners: {},
    methods: {
        getCodeAndRedirect() {
            const state = encodeURIComponent(`?backUrl=/wechatLogin/confirm?oakId=${this.props.oakId}`);
            if (process.env.NODE_ENV === 'development') {
                this.navigateTo(
                    {
                        url: '/wechatUser/login',
                        wechatLoginId: this.props.oakId,
                        code: `CODE_${Math.random()}`,
                        state,
                    },
                );
            }
            else {
                const { appId } = this.state;
                const redirectUrl = `${window.location.host}/wechaUser/login?wechatLoginId=${this.props.oakId}`;
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&state=${state}&redirect_uri=${redirectUrl}&response_type=code&scope=SCOPE#wechat_redirect`
            }
        }
    },
});
