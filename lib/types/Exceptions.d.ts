import { OakUserException } from "oak-domain/lib/types";
export declare class OakUnloggedInException extends OakUserException {
    constructor(message?: string);
}
export declare class OakNotEnoughMoneyException extends OakUserException {
    constructor(message?: string);
}
export declare class OakDistinguishUserByWechatUserException extends OakUserException {
    userId: string;
    constructor(userId: string, message?: string);
    toString(): string;
}
export declare class OakDistinguishUserByBusinessException extends OakUserException {
    userId: string;
    constructor(userId: string, message?: string);
    toString(): string;
}
export declare class OakUserDisabledException extends OakUserException {
    constructor(message?: string);
}
export declare function makeException(data: {
    name: string;
    message?: string;
    [A: string]: any;
}): import("oak-domain/lib/types").OakException | import("oak-domain/lib/types").OakExternalException | undefined;
