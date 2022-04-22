import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base';
import { EntityDict } from 'oak-app-domain/EntityDict';
import { GeneralRuntimeContext } from '../RuntimeContext';
import aspectDict from '../aspects';
declare global {
    const OakPage: MakeOakPage<EntityDict, GeneralRuntimeContext<EntityDict>, typeof aspectDict, {}>;
    const OakComponent: MakeOakComponent<EntityDict, GeneralRuntimeContext<EntityDict>, typeof aspectDict, {}>;
}
export {}