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

export class OakDistinguishUserException extends OakUserException {
    userId: string;
    usingPassword: boolean;
    usingIdCard: boolean;
    usingWechatUser: boolean;
    usingEmail: boolean;
    constructor(userId: string, usingPassword: boolean, usingIdCard: boolean, usingWechatUser: boolean, usingEmail: boolean, message?: string) {
        super(message || '系统中发现相同帐户，需要您加以甄别');
        this.userId = userId;
        this.usingIdCard = usingIdCard;
        this.usingPassword = usingPassword;
        this.usingWechatUser = usingWechatUser;
        this.usingEmail = usingEmail;
    }

    toString() {
        return JSON.stringify({
            name: this.constructor.name,
            message: this.message,
            userId: this.userId,
            usingIdCard: this.usingIdCard,
            usingPassword: this.usingPassword,
            usingWechatUser: this.usingWechatUser,
            usingEmail: this.usingEmail,
        });
    }
};

export class OakChangLoginWayException extends OakUserException {
    userId: string;
    usingIdCard: boolean;
    usingWechatUser: boolean;
    usingEmail: boolean;
    constructor(userId: string, usingIdCard: boolean, usingWechatUser: boolean, usingEmail: boolean, message?: string) {
        super(message || '系统中发现相同帐户，需要您加以甄别');
        this.userId = userId;
        this.usingIdCard = usingIdCard;
        this.usingWechatUser = usingWechatUser;
        this.usingEmail = usingEmail;
    }

    toString() {
        return JSON.stringify({
            name: this.constructor.name,
            message: this.message,
            userId: this.userId,
            usingIdCard: this.usingIdCard,
            usingWechatUser: this.usingWechatUser,
            usingEmail: this.usingEmail,
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
        case OakDistinguishUserException.name: {
            return new OakDistinguishUserException(data.userId, data.usingPassword, data.usingIdCard, data.usingWechatUser, data.usingEmail, message);
        }
        case OakUserDisabledException.name: {
            return new OakUserDisabledException(message);
        }
        default: {
            return;
        }
    }
}