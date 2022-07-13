import { String, Text, Image, Datetime } from 'oak-domain/lib/types/DataType';
import { Schema as ExtraFile } from './ExtraFile';
import { Schema as System } from './System';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    name?: String<16>;
    nickname?: String<64>;
    password?: Text;
    passwordOrigin?: Text;
    birth?: Datetime;
    gender?: 'male' | 'female';
    avatar?: Image;
    idCardType?: 'ID-Card' | 'passport' | 'Mainland-passport';
    idNumber?: String<32>;
    ref?: Schema;
    files: Array<ExtraFile>;
    system: System;
}
