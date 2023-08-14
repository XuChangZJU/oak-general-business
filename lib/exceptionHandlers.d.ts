import { ExceptionHandlerDict } from "oak-frontend-base/lib/types/ExceptionHandler";
import { EntityDict } from './oak-app-domain';
import { GeneralFeatures } from './features/index';
import { BRC, FRC, FrcAspectDict } from './types/RuntimeCxt';
export declare const handlerDict: ExceptionHandlerDict<EntityDict, BRC, FRC, FrcAspectDict, GeneralFeatures<EntityDict, BRC, FRC, FrcAspectDict>>;
