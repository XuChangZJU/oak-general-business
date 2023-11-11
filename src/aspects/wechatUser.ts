import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { OakUserException } from 'oak-domain/lib/types';

import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';

export async function unbindingWechat<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        wechatUserId: string;
        captcha?: string,
        mobile?: string,
    },
    context: Cxt
) {
    const { wechatUserId, captcha, mobile } = params;
    const fn = async () => {
        const userId = context.getCurrentUserId();
        // 校验传入的wechatUser.userId 是否和当前登录者的id相等
        const [wechatUser] = await context.select('wechatUser', {
            data: {
                id: 1,
                userId: 1,
            },
            filter: {
                id: wechatUserId,
            }
        }, {});
        assert(wechatUser.userId === userId, '查询到的wechatUser.userId与当前登录者不相同')
        await context.operate('wechatUser', {
            id: await generateNewIdAsync(),
            action: 'update',
            data: {
                userId: null,
            },
            filter: {
                id: wechatUserId,
            }
        }, {
            dontCollect: true,
        });
    }
    if (mobile && captcha) {
        const result = await context.select('captcha', {
            data: {
                id: 1,
                expired: 1,
            },
            filter: {
                mobile,
                code: captcha,
            },
            sorter: [{
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            }],
            indexFrom: 0,
            count: 1,
        }, { dontCollect: true });
        if (result.length > 0) {
            const [captchaRow] = result;
            if (captchaRow.expired) {
                throw new OakUserException('验证码已经过期');
            }
            fn();
        }
        else {
            throw new OakUserException('验证码无效');
        }
    }
    else {
        fn();
    }
}
