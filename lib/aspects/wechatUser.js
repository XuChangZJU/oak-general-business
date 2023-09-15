"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbindingWechat = void 0;
const tslib_1 = require("tslib");
const types_1 = require("oak-domain/lib/types");
const uuid_1 = require("oak-domain/lib/utils/uuid");
const assert_1 = tslib_1.__importDefault(require("assert"));
async function unbindingWechat(params, context) {
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
        (0, assert_1.default)(wechatUser.userId === userId, '查询到的wechatUser.userId与当前登录者不相同');
        await context.operate('wechatUser', {
            id: await (0, uuid_1.generateNewIdAsync)(),
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
    };
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
                throw new types_1.OakUserException('验证码已经过期');
            }
            fn();
        }
        else {
            throw new types_1.OakUserException('验证码无效');
        }
    }
    else {
        fn();
    }
}
exports.unbindingWechat = unbindingWechat;
