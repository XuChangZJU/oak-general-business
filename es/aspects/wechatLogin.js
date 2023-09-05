import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
export async function createWechatLogin(params, context) {
    const { type, interval } = params;
    let userId;
    if (type === 'bind') {
        userId = context.getCurrentUserId();
    }
    const id = await generateNewIdAsync();
    const createData = {
        id,
        type,
        expiresAt: Date.now() + interval,
        expired: false,
        qrCodeType: 'wechatPublic',
        successed: false,
    };
    if (userId) {
        Object.assign(createData, {
            userId,
        });
    }
    await context.operate('wechatLogin', {
        id: await generateNewIdAsync(),
        action: 'create',
        data: createData,
    }, {
        dontCollect: true,
    });
    return id;
}
