import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from "../general-app-domain";
import { WechatMpConfig } from "../general-app-domain/Application/Schema";
import { CreateOperationData as CreateWechatQrcodeData, WechatQrCodeProps } from '../general-app-domain/WechatQrCode/Schema';
import { RuntimeContext } from '../context/RuntimeContext';

export async function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends RuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    applicationId: string;
    tag?: string;
    lifetimeLength?: number;
    permanent?: boolean;
    props: WechatQrCodeProps;
}, context: Cxt) {
    const { entity, entityId, applicationId, tag, lifetimeLength, permanent, props } = options;
    const { type: appType, config } = (await context.getApplication())!;

    if (appType === 'wechatMp') {
        const { qrCodePrefix } = <WechatMpConfig>config;
        const id = await generateNewId();
        if (qrCodePrefix) {
            // 设置了域名跳转，优先使用域名 + id来生成对应的ur
            const data: CreateWechatQrcodeData = {
                id,
                type: 'wechatMpDomainUrl',
                tag,
                entity: entity as string,
                entityId,
                applicationId,
                allowShare: true,
                permanent: true,
                url: `${qrCodePrefix}/id`,
                expired: false,
                props,
            };
            await context.rowStore.operate(
                'wechatQrCode',
                {
                    id: await generateNewId(),
                    action: 'create',
                    data,
                },
                context,
                {
                    dontCollect: true,
                }
            );

            return data;
        } else {
            // 没有域名跳转，使用小程序码
            // todo这里如果有同组的公众号，应该优先使用公众号的关注链接
            const data: CreateWechatQrcodeData = {
                id,
                type: 'wechatMpWxaCode',
                tag,
                entity: entity as string,
                entityId,
                applicationId,
                allowShare: true,
                permanent: false,
                expired: false,
                props,
            };

            await context.rowStore.operate(
                'wechatQrCode',
                {
                    id: await generateNewId(),
                    action: 'create',
                    data,
                },
                context,
                {
                    dontCollect: true,
                }
            );
            return data;
        }
    } else if (appType === 'wechatPublic') {
        const id = await generateNewId();
        const data: CreateWechatQrcodeData = {
            id,
            type: 'wechatPublic',
            tag,
            entity: entity as string,
            entityId,
            applicationId,
            allowShare: true,
            permanent: false,
            expired: false,
            props,
        };

        await context.rowStore.operate(
            'wechatQrCode',
            {
                id: await generateNewId(),
                action: 'create',
                data,
            },
            context,
            {
                dontCollect: true,
            }
        );
        return data;
    } else {
        assert(appType === 'web');
        const id = await generateNewId();
        const data: CreateWechatQrcodeData = {
            id,
            type: 'webForWechatPublic',
            tag,
            entity: entity as string,
            entityId,
            applicationId,
            allowShare: true,
            permanent: false,
            expired: false,
            props,
        };

        await context.rowStore.operate(
            'wechatQrCode',
            {
                id: await generateNewId(),
                action: 'create',
                data,
            },
            context,
            {
                dontCollect: true,
            }
        );
        return data;
    }
}