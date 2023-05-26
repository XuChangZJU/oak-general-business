import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict  } from 'oak-domain/lib/base-app-domain';
import { EntityDict as GeneralEntityDict } from '../src/general-app-domain';

type TT<ED extends BaseEntityDict['relation']> = ED;

type T = TT<GeneralEntityDict['relation']>;

type UA = Exclude<'create' | 'update', 'create'>;
const ua: UA = 'create';