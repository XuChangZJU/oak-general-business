import { Text, Datetime } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
import { QrCodeType } from '../types/Config';
export interface Schema extends EntityShape {
    user?: User;
    type: 'bind' | 'login';
    successed: Boolean;
    remark?: Text;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime;
    expired?: Boolean;
    codes: Array<WechatQrCode>;
}
