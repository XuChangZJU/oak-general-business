import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from 'oak-app-domain/EntityDict';
import { Trigger } from 'oak-domain/lib/types';
import addressTriggers from './address';
import userTriggers from './user';
import userEntityGrantTriggers from './userEntityGrant';

export default [...addressTriggers, ...userTriggers, ...userEntityGrantTriggers];
