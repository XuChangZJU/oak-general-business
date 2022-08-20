import { MakeOakComponent, MakeOakPage } from 'oak-frontend-base/lib/page.mp';
import {
    MakeOakComponent as MakeOakWebComponent,
    MakeOakPage as MakeOakWebPage,
} from 'oak-frontend-base/lib/page.web';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../src/RuntimeContext';
import { aspectDict } from '../src/aspects';
import { initialize } from '../src/features';


declare global {
    const generateNewId: (options?: { timestamp?: boolean }) => Promise<string>;

     const OakPage:
         | MakeOakPage<
               EntityDict,
               RuntimeContext,
               typeof aspectDict,
               ReturnType<typeof initialize>['features']
           >
         | MakeOakWebPage<
               EntityDict,
               RuntimeContext,
               typeof aspectDict,
               ReturnType<typeof initialize>['features']
           >;
     const OakComponent:
         | MakeOakComponent<
               EntityDict,
               RuntimeContext,
               typeof aspectDict,
               ReturnType<typeof initialize>['features']
           >
         | MakeOakWebComponent<
               EntityDict,
               RuntimeContext,
               typeof aspectDict,
               ReturnType<typeof initialize>['features']
           >;
}
export {}