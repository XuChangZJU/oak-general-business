import { String, Text, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
import { Schema as WechatQrCode } from './WechatQrCode';
import { QrCodeType } from '../types/Config';
type RelationIds = string[];
export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
    isTabBar?: boolean;
};
type Rule = 'single' | 'all' | 'free';
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    relationEntity: String<32>;
    relationEntityFilter: Object;
    relationIds: RelationIds;
    type: 'grant' | 'transfer';
    rule: Rule;
    ruleOnRow: Rule;
    multiple?: Boolean;
    remark?: Text;
    granter: User;
    codes: Array<WechatQrCode>;
    qrCodeType: QrCodeType;
    expiresAt?: Datetime;
    expired?: Boolean;
    redirectTo?: RedirectToProps;
    claimUrl: String<128>;
}
export {};
