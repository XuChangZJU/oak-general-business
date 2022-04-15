import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from '../base-ed/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import addressTriggers from './address';

export default [...addressTriggers];
