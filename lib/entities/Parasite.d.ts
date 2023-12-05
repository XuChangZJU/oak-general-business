import { String, Int, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as User } from './User';
import { Schema as Token } from './Token';
type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export interface Schema extends EntityShape {
    user: User;
    entity: String<32>;
    entityId: String<64>;
    showTip?: Boolean;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
    multiple?: Boolean;
    tokenLifeLength?: Int<4>;
    tokens: Token[];
}
export {};
