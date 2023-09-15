import { String, Text, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { QrCodeType } from '../types/Config';
import { Schema as Application } from './Application';
export type WechatQrCodeProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    type: QrCodeType;
    allowShare: Boolean;
    tag?: String<32>;
    tag2?: String<64>;
    expiresAt?: Datetime;
    expired?: Boolean;
    ticket?: Text;
    url?: String<256>;
    permanent?: Boolean;
    buffer?: Text;
    application: Application;
    props: WechatQrCodeProps;
}
