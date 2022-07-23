import { WechatMpEnv } from "general-app-domain/Token/Schema";
import { pick } from "oak-domain/lib/utils/lodash";

export async function getEnv() {
    const env = await wx.getSystemInfo();
    const env2 = pick(env, [
        'brand',
        'model',
        'pixelRatio',
        'screenWidth',
        'screenHeight',
        'windowWidth',
        'windowHeight',
        'statusBarHeight',
        'language',
        'version',
        'system',
        'platform',
        'fontSizeSetting',
        'SDKVersion'
    ]);
    return Object.assign(env2, {
        type: 'wechatMp',
    }) as any;
}