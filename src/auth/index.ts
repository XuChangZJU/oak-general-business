import { AuthDefDict } from 'oak-domain/lib/types/Auth';
import { EntityDict } from '../general-app-domain';

import mobile from './mobile';
// import park from './park';

export default {
    mobile,
} as AuthDefDict<EntityDict>;