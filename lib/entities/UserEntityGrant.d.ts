import { String, Text, Datetime, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
import { QrCodeType } from '../types/Config';
export declare type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relation: String<32>;
    type: 'grant' | 'transfer';
    number: Int<2>;
    confirmed: Int<2>;
    remark?: Text;
    granter: User;
    grantee?: User;
    codes: Array<WechatQrCode>;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime;
    expired?: Boolean;
    redirectTo?: RedirectToProps;
}
