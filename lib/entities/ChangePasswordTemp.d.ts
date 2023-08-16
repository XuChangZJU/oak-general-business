import { EntityShape } from 'oak-domain/lib/types/Entity';
import { String } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
export interface Schema extends EntityShape {
    user: User;
    prevPassword?: String<32>;
    newPassword?: String<32>;
    result: 'success' | 'fail';
}
