import { assert } from 'oak-domain/lib/utils/assert';
import { applicationProjection } from '../types/projection';
import { WechatSDK, } from 'oak-external-sdk';
export async function getApplication(params, context) {
    const { type, domain } = params;
    const url = context.getHeader('host');
    console.log('url is', url);
    const [application] = await context.select('application', {
        data: applicationProjection,
        filter: {
            type,
            system: {
                domain$system: {
                    url: domain,
                }
            },
        },
    }, {});
    //微信小程序环境下 没有就报错
    if (type === 'wechatMp') {
        assert(application, '微信小程序环境下 application必须存在小程序相关配置');
    }
    else {
        //web 或 wechatPublic
        if (type === 'wechatPublic') {
            // 如果微信公众号环境下 application不存在公众号配置，但又在公众号访问，这时可以使用web的application
            if (!application) {
                const [application2] = await context.select('application', {
                    data: applicationProjection,
                    filter: {
                        type: 'web',
                        system: {
                            domain$system: {
                                url: domain,
                            }
                        },
                    },
                }, {});
                assert(application2, '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置');
                return application2.id;
            }
        }
        else {
            assert(application, 'web环境下 application必须存在web相关配置');
        }
    }
    return application.id;
}
export async function signatureJsSDK({ url, env }, context) {
    const application = context.getApplication();
    const { type, config, systemId } = application;
    assert(type === 'wechatPublic' && config.type === 'wechatPublic');
    const config2 = config;
    const { appId, appSecret } = config2;
    const wechatInstance = WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
    const result = await wechatInstance.signatureJsSDK({ url });
    return result;
}
