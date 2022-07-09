import { OakUserException, makeException as makeException2 } from "oak-domain/lib/types";

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

export class OakDistinguishUserByWechatUserException extends OakUserException {
    userId: string;
    constructor(userId: string, message?: string) {
        super(message || '系统中发现可能属于您的另一帐户');
        this.userId = userId;
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            message: this.message,
            userId: this.userId,
        });
    }
}

export class OakDistinguishUserByBusinessException extends OakUserException {
    userId: string;
    constructor(userId: string, message?: string) {
        super(message || '系统中发现可能属于您的另一帐户');
        this.userId = userId;
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            message: this.message,
            userId: this.userId,
        });
    }
}

export class OakUserDisabledException extends OakUserException {
    constructor(message?: string) {
        super(message || '您的帐户已被禁用，请联系系统管理员');
    }
}

export function makeException(data: {
    name: string;
    message?: string;
    [A: string]: any;
}) {
    const exception = makeException2(data);
    if (exception) {
        return exception;
    }

    const { name, message } = data;
    switch (name) {
        case OakUnloggedInException.name: {
            return new OakUnloggedInException(message);
        }
        case OakNotEnoughMoneyException.name: {
            return new OakNotEnoughMoneyException(message);
        }
        case OakDistinguishUserByWechatUserException.name: {
            return new OakDistinguishUserByWechatUserException(data.userId, message);
        }
        case OakDistinguishUserByBusinessException.name: {
            return new OakDistinguishUserByBusinessException(data.userId, message);
        }
        case OakUserDisabledException.name: {
            return new OakUserDisabledException(message);
        }
        default: {
            return;
        }
    }
}