// declare const getRandomValues: (length: number) => Promise<Uint8Array>;

import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base';
import { EntityDict } from '../base-ed/EntityDict';
import { RuntimeContext } from '../RuntimeContext';
import aspectDict from '../aspects';
declare const OakPage: MakeOakPage<EntityDict, RuntimeContext<EntityDict>, typeof aspectDict, {}>;
declare const OakComponent: MakeOakComponent<EntityDict, RuntimeContext<EntityDict>, typeof aspectDict, {}>;