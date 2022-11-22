import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from "../general-app-domain";
import { Config as SysConfig, QrCodeType } from '../types/Config';
import { Schema as Application, WechatMpConfig, WechatPublicConfig } from "../general-app-domain/Application/Schema";
import { CreateOperationData as CreateWechatQrcodeData, WechatQrCodeProps } from '../general-app-domain/WechatQrCode/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

/**
 * 生成二维码优先级如下：
 * 0）如果在SystemConfig中指定了qrCodeType，则按照qrCodeType去生成
 * 1）如果有服务号，优先生成关注服务号的带参二维码
 * 2）如果有小程序，优先生成小程序的二维码（如果小程序中配置了qrCodePrefix），其次生成小程序码
 * @param options 
 * @param context 
 * @returns 
 */
export async function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    tag?: string;
    lifetimeLength?: number;
    permanent?: boolean;
    props: WechatQrCodeProps;
}, context: Cxt) {
    const { entity, entityId, tag, lifetimeLength = 300 * 10000, permanent = false, props } = options;
    const applicationId = context.getApplicationId();
    assert(applicationId);
    const [system] = await context.select('system', {
        data: {
            id: 1,
            config: 1,
            application$system: {
                $entity: 'application',
                data: {
                    id: 1,
                    type: 1,
                    config: 1,
                },
            },
        },
        filter: {
            id: applicationId,
        },
    }, {
        dontCollect: true,
    });

    let appId: string = '', appType: QrCodeType | undefined = undefined;
    let url: string | undefined = undefined;
    const { application$system: applications, config: sysConfig } = system as {
        application$system: Application[];
        config: SysConfig
    };
    const id = generateNewId();
    if (sysConfig.App.qrCodeApplicationId) {
        appId = sysConfig.App.qrCodeApplicationId;
        appType = sysConfig.App.qrCodeType!;
    }
    else {
        const self = applications.find(
            ele => ele.id === applicationId
        );
        // 如果本身是服务号，则优先用自己的
        if (self!.type === 'wechatPublic' && (self!.config as WechatPublicConfig).isService) {
            appId = applicationId;
            appType = 'wechatPublic';
        }
        const publicApp = applications.find(
            ele => ele.type === 'wechatPublic' && (ele.config as WechatPublicConfig).isService
        );
        if (publicApp) {
            appId = publicApp.id;
            appType = 'wechatPublic';
        }

        // 如果本身是小程序，则优先用自己的
        if (self?.type === 'wechatMp') {
            appId = self.id;
            if ((self!.config as WechatMpConfig).qrCodePrefix) {
                appType = 'wechatMpDomainUrl';
                url = `${(self!.config as WechatMpConfig).qrCodePrefix}/${id}`;
            }
            else {
                appType = 'wechatMpWxaCode';
            }
        }
        const mpApp = applications.find(
            ele => ele.type === 'wechatMp'
        );
        if (mpApp) {
            appId = mpApp.id;
            if ((mpApp!.config as WechatMpConfig).qrCodePrefix) {
                appType = 'wechatMpDomainUrl';
                url = `${(mpApp!.config as WechatMpConfig).qrCodePrefix}/${id}`;
            }
            else {
                appType = 'wechatMpWxaCode';
            }
        }
    }

    if (!appId || !appType) {
        throw new Error('无法生成二维码，找不到此system下的服务号或者小程序信息');
    }

    const data: CreateWechatQrcodeData = {
        id,
        type: appType,
        tag,
        entity: entity as string,
        entityId,
        applicationId: appId,
        allowShare: true,
        permanent,
        url,
        expired: false,
        expiresAt: Date.now() + lifetimeLength,
        props,
    };

    await context.operate(
        'wechatQrCode',
        {
            id: generateNewId(),
            action: 'create',
            data,
        },
        {
            dontCollect: true,
        }
    );
}