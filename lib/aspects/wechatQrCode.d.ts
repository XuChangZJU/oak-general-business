import { EntityDict } from "../oak-app-domain";
import { QrCodeType } from '../types/Config';
import { WechatQrCodeProps } from '../oak-app-domain/WechatQrCode/Schema';
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
export declare function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    tag?: string;
    permanent?: boolean;
    type?: QrCodeType;
    props: WechatQrCodeProps;
}, context: Cxt): Promise<void>;
export declare function getMpUnlimitWxaCode<ED extends EntityDict, T extends keyof ED, Cxt extends BackendRuntimeContext<ED>>(wechatQrCodeId: string, context: Cxt): Promise<string>;
