import { OakUserException, makeException as makeException2 } from "oak-domain/lib/types";


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

export class OakChangeLoginWayException extends OakUserException {
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

export class OakMobileUnsetException extends OakUserException {
    constructor(message?: string) {
        super(message || '您需要先登记手机号');
    }
}

export class OakUserInfoUncompletedException extends OakUserException {
    constructor(message?: string) {
        super(message || '您需要先填写完整的用户信息');
    }
}

export class OakUserDisabledException extends OakUserException {
    constructor(message?: string) {
        super(message || '您的帐户已被禁用，请联系系统管理员');
    }
}


export class OakTokenExpiredException extends OakUserException {
    constructor(message?: string) {
        super(message || '当前登录状态已经过期');
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
        case 'OakNotEnoughMoneyException': {
            return new OakNotEnoughMoneyException(message);
        }
        case 'OakDistinguishUserException': {
            return new OakDistinguishUserException(data.userId, data.usingPassword, data.usingIdCard, data.usingWechatUser, data.usingEmail, message);
        }
        case 'OakUserDisabledException': {
            return new OakUserDisabledException(message);
        }
        case 'OakTokenExpiredException': {
            return new OakTokenExpiredException(message);
        }
        case 'OakMobileUnsetException': {
            return new OakMobileUnsetException(message);
        }
        case 'OakUserInfoUncompletedException': {
            return new OakUserInfoUncompletedException(message);
        }
        default: {
            return;
        }
    }
}