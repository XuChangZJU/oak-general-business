import { EntityDict } from "general-app-domain";
import { WechatQrCodeProps } from 'general-app-domain/WechatQrCode/Schema';
import { GeneralRuntimeContext } from "../RuntimeContext";
export declare function createWechatQrCode<ED extends EntityDict, T extends keyof ED, Cxt extends GeneralRuntimeContext<ED>>(options: {
    entity: T;
    entityId: string;
    applicationId: string;
    tag?: string;
    lifetimeLength?: number;
    permanent?: boolean;
    props: WechatQrCodeProps;
}, context: Cxt): Promise<CreateWechatQrcodeData>;
