import { String, Datetime, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
type RedirectTo = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export interface Schema extends EntityShape {
    entity: String<32>;
    entityId: String<64>;
    expiresAt: Datetime;
    expired: Boolean;
    redirectTo: RedirectTo;
}
export {};
