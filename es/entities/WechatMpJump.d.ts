import { Boolean, Datetime, Int, String } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Message } from './Message';
type Jump_wxa = {
    path?: string;
    query?: string;
    env_version?: string;
};
export interface Schema extends EntityShape {
    message?: Message;
    jump_wxa: Jump_wxa;
    openlink: String<256>;
    expireType: Int<1>;
    expireInterval?: Int<2>;
    expiresAt?: Datetime;
    expired: Boolean;
}
export {};
