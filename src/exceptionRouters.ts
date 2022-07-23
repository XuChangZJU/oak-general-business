import { ExceptionRouters } from "oak-frontend-base/lib/types/ExceptionRoute";
import { OakUnloggedInException } from "./types/Exceptions";

export const routers: ExceptionRouters = [
    [OakUnloggedInException, {
        router: '/token/login',
    }]
];