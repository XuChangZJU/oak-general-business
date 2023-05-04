import { EntityDict } from '../../../general-app-domain';

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

        return {
            type,
            userId,
            expired: wechatLogin?.expired,
            expiresAt: wechatLogin?.expiresAt,
            successed: wechatLogin?.successed,
            loginUserId,
        };
    },
    listeners: {},
    methods: {},
});
