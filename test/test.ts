import { EntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict as BaseEntityDict  } from 'oak-domain/lib/base-app-domain';
import { EntityDict as GeneralEntityDict } from '../src/general-app-domain';

type TT<ED extends BaseEntityDict['user']['Selection']['data']> = ED;

type T = TT<GeneralEntityDict['user']['Selection']['data']>;

type UA = Exclude<'create' | 'update', 'create'>;
const ua: UA = 'create';