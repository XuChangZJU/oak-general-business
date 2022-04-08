import { EntityDict } from "oak-domain/lib/types/Entity";
import { RuntimeContext } from './RuntimeContext';
export interface Aspect<ED extends EntityDict> {
    (params: any, context: RuntimeContext<ED>): Promise<any>;
}
