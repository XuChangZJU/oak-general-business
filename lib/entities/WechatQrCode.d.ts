import { String, Text, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
export declare type WechatQrCodeProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    type: 'wechatMpDomainUrl' | 'wechatMpWxaCode' | 'wechatPublic' | 'wechatPublicForMp' | 'webForWechatPublic';
    allowShare: Boolean;
    tag?: String<32>;
    expiresAt?: Datetime;
    expired?: Boolean;
    ticket?: Text;
    url?: String<64>;
    permanent: Boolean;
    buffer?: Text;
    application: Application;
    props: WechatQrCodeProps;
}
