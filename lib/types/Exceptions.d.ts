import { OakUserException } from "oak-domain/lib/types";
export declare class OakNotEnoughMoneyException extends OakUserException {
    constructor(message?: string);
}
export declare class OakDistinguishUserException extends OakUserException {
    userId: string;
    usingPassword: boolean;
    usingIdCard: boolean;
    usingWechatUser: boolean;
    usingEmail: boolean;
    constructor(userId: string, usingPassword: boolean, usingIdCard: boolean, usingWechatUser: boolean, usingEmail: boolean, message?: string);
    toString(): string;
}
export declare class OakChangeLoginWayException extends OakUserException {
    userId: string;
    usingIdCard: boolean;
    usingWechatUser: boolean;
    usingEmail: boolean;
    constructor(userId: string, usingIdCard: boolean, usingWechatUser: boolean, usingEmail: boolean, message?: string);
    toString(): string;
}
export declare class OakUserDisabledException extends OakUserException {
    constructor(message?: string);
}
export declare class OakTokenExpiredException extends OakUserException {
    constructor(message?: string);
}
export declare function makeException(data: {
    name: string;
    message?: string;
    [A: string]: any;
}): import("oak-domain/lib/types").OakException | import("oak-domain/lib/types").OakExternalException | undefined;
