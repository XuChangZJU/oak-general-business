import { OakUserException } from "oak-domain/lib/types";
export declare class OakUnloggedInException extends OakUserException {
    constructor(message?: string);
}
export declare class OakNotEnoughMoneyException extends OakUserException {
    constructor(message?: string);
}
