import { ExceptionRouters } from "oak-frontend-base";
import { OakUnloggedInException } from "./types/Exceptions";

export const routers: ExceptionRouters = [
    [OakUnloggedInException, {
        router: '/token/login',
    }]
];