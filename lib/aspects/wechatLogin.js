"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatLogin = void 0;
const uuid_1 = require("oak-domain/lib/utils/uuid");
async function createWechatLogin(params, context) {
    const { type, interval } = params;
    let userId;
    if (type === 'bind') {
        userId = context.getCurrentUserId();
    }
    const id = await (0, uuid_1.generateNewIdAsync)();
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
        id: await (0, uuid_1.generateNewIdAsync)(),
        action: 'create',
        data: createData,
    }, {
        dontCollect: true,
    });
    return id;
}
exports.createWechatLogin = createWechatLogin;
