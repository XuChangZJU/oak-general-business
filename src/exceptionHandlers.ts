import { ExceptionHandlerDict } from "oak-frontend-base/lib/types/ExceptionHandler";
import { OakUnloggedInException } from "oak-domain/lib/types/Exception";
import { EntityDict } from './general-app-domain';
import { RuntimeContext } from './context/RuntimeContext';
import { GeneralFeatures } from './features/index';
import { AspectDict } from './aspects/AspectDict';
import { OakTokenExpiredException } from "./types/Exception";

export const handlerDict: ExceptionHandlerDict<
    EntityDict, 
    RuntimeContext<EntityDict>,
    AspectDict<EntityDict, RuntimeContext<EntityDict>>,
    GeneralFeatures<EntityDict, RuntimeContext<EntityDict>, AspectDict<EntityDict, RuntimeContext<EntityDict>>>> = {
    [OakUnloggedInException.name]: async (features) => {
        await features.token.logout();
        features.navigator.navigateTo('/mobile/login');
    },
    [OakTokenExpiredException.name]: async (features) => {
        await features.token.logout();
        features.navigator.navigateTo('/mobile/login');
    }
}