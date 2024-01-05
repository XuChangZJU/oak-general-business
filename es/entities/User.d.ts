import { String, Text, Boolean, Datetime } from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { Schema as ExtraFile } from './ExtraFile';
import { Schema as WechatQrCode } from './WechatQrCode';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as Address } from './Address';
import { Schema as Account } from './Account';
export interface Schema extends EntityShape {
    name?: String<16>;
    nickname?: String<64>;
    password?: Text;
    passwordSha1?: Text;
    birth?: Datetime;
    gender?: 'male' | 'female';
    idCardType?: 'ID-Card' | 'passport' | 'Mainland-passport';
    idNumber?: String<32>;
    ref?: Schema;
    files: Array<ExtraFile>;
    codes: Array<WechatQrCode>;
    isRoot?: Boolean;
    addresses?: Address[];
    accounts?: Account[];
}
type IdAction = 'verify' | 'accept' | 'reject';
type IdState = 'unverified' | 'verified' | 'verifying';
type UserAction = 'activate' | 'disable' | 'enable' | 'mergeTo' | 'mergeFrom';
type UserState = 'shadow' | 'normal' | 'disabled' | 'merged';
export declare const UserActionDef: ActionDef<UserAction, UserState>;
type Action = UserAction | IdAction;
export declare const entityDesc: EntityDesc<Schema, Action, '', {
    userState: UserState;
    idState: IdState;
    gender: Required<Schema>['gender'];
    idCardType: Required<Schema>['idCardType'];
}>;
export {};
