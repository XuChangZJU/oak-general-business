import { ExceptionHandlerDict } from "oak-frontend-base/lib/types/ExceptionHandler";
import { OakUnloggedInException } from "oak-domain/lib/types/Exception";
import { EntityDict } from './oak-app-domain';
import { GeneralFeatures } from './features/index';
import { OakTokenExpiredException } from "./types/Exception";
import { BRC, FRC, FrcAspectDict } from './types/RuntimeCxt';


export const handlerDict: ExceptionHandlerDict<
    EntityDict, 
    BRC,
    FRC,
    FrcAspectDict,
    GeneralFeatures<EntityDict, BRC, FRC, FrcAspectDict>> = {
    [OakUnloggedInException.name]: async (features) => {
        await features.token.logout();
        features.navigator.navigateTo(
            {
                url: '/mobile/login',
            },
            undefined,
            true
        );
    },
    [OakTokenExpiredException.name]: async (features) => {
        await features.token.logout();
        features.navigator.navigateTo(
            {
                url: '/mobile/login',
            },
            undefined,
            true
        );
    }
}