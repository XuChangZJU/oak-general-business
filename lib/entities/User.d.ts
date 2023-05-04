import { String, Text, Boolean, Datetime } from 'oak-domain/lib/types/DataType';
import { Schema as ExtraFile } from './ExtraFile';
import { Schema as WechatQrCode } from './WechatQrCode';
import { EntityShape } from 'oak-domain/lib/types/Entity';
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
}
