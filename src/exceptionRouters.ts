import { ExceptionRouters } from "oak-frontend-base/lib/types/ExceptionRoute";
import { OakUnloggedInException } from "oak-domain/lib/types/Exception";

export const routers: ExceptionRouters = [
    [
        OakUnloggedInException, {
            router: '/login',
            disableNamespace: true,
        }
    ]
];