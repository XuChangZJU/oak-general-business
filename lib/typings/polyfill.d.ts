export declare type getRandomValues = (length: number) => Promise<Uint8Array>;
import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base';
import { EntityDict } from '../base-ed/EntityDict';
import { RuntimeContext } from '../RuntimeContext';
import aspectDict from '../aspects';
export declare type OakPage = MakeOakPage<EntityDict, RuntimeContext<EntityDict>, typeof aspectDict, {}>;
export declare type OakComponent = MakeOakComponent<EntityDict, RuntimeContext<EntityDict>, typeof aspectDict, {}>;
