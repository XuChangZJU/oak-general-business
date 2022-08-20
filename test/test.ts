import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-app-domain';
import { EntityDict as GeneralEntityDict } from '../src/general-app-domain';

type TT<ED extends BaseEntityDict['modiEntity']['CreateSingle']> = ED;

type T = TT<GeneralEntityDict['modiEntity']['CreateSingle']>;