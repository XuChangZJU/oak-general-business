import { OakUserException, OakException } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { EntityDict as BaseEntityDict, SelectOpResult } from 'oak-domain/lib/types/Entity';
export declare class OakNotEnoughMoneyException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    constructor(message?: string);
}
export declare class OakDistinguishUserException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    userId: string;
    usingPassword: boolean;
    usingIdCard: boolean;
    usingWechatUser: boolean;
    usingEmail: boolean;
    constructor(userId: string, usingPassword: boolean, usingIdCard: boolean, usingWechatUser: boolean, usingEmail: boolean, message?: string);
    toString(): string;
}
export declare class OakChangeLoginWayException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    userId: string;
    usingIdCard: boolean;
    usingWechatUser: boolean;
    usingEmail: boolean;
    constructor(userId: string, usingIdCard: boolean, usingWechatUser: boolean, usingEmail: boolean, message?: string);
    toString(): string;
}
export declare class OakMobileUnsetException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    constructor(message?: string);
}
export declare class OakUserInfoUncompletedException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    constructor(message?: string);
}
export declare class OakUserDisabledException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    constructor(message?: string);
}
export declare class OakTokenExpiredException<ED extends EntityDict & BaseEntityDict> extends OakUserException<ED> {
    constructor(message?: string);
}
export declare class OakMpHaveToSubscribeMessage extends Error {
    rejectedMessageType: string[];
    constructor(rejectedMessageType: string[], message?: string);
}
export declare function makeException<ED extends EntityDict & BaseEntityDict>(data: {
    name: string;
    message?: string;
    opRecords: SelectOpResult<ED>;
    [A: string]: any;
}): OakException<BaseEntityDict> | undefined;
