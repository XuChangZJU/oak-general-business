import { Endpoint } from 'oak-domain/lib/types/Endpoint';
import { EntityDict } from '../general-app-domain';
import { BRC } from '../types/RuntimeCxt';
declare const endpoints: Array<Endpoint<EntityDict, BRC>>;
export default endpoints;
