import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';
import { Trigger } from '../types/Trigger';
import addressTriggers from './address';

export default [...addressTriggers] as Array<Trigger<EntityDict & BaseEntityDict, keyof (EntityDict & BaseEntityDict)>>;