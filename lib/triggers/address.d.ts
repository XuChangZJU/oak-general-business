import { CreateTriggerInTxn } from 'oak-domain/lib/types/Trigger';
import { EntityDict } from '../base-ed/EntityDict';
declare const triggers: CreateTriggerInTxn<EntityDict, 'address'>[];
export default triggers;
