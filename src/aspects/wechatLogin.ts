import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";

import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { CreateOperationData as createWechatLoginData } from '../oak-app-domain/WechatLogin/Schema';

export async function createWechatLogin<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        type: EntityDict['wechatLogin']['Schema']['type'];
        interval: number;
    },
    context: Cxt
) {
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
        })
    }
    await context.operate('wechatLogin', {
        id: await generateNewIdAsync(),
        action: 'create',
        data: createData as createWechatLoginData,
    }, {
        dontCollect: true,
    });
    return id;
}
