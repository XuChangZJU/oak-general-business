import { OakUserException } from "oak-domain/lib/types";

export class OakUnloggedInException extends OakUserException {
    constructor(message?: string) {
        super(message || '您尚未登录');
    }
};
export class OakNotEnoughMoneyException extends OakUserException {
    constructor(message?: string) {
        super(message || '您的余额不足');
    }
};