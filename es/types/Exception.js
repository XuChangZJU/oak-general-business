import { OakUserException, makeException as makeException2 } from "oak-domain/lib/types";
export class OakNotEnoughMoneyException extends OakUserException {
    constructor(message) {
        super(message || '您的余额不足');
    }
}
;
export class OakDistinguishUserException extends OakUserException {
    userId;
    usingPassword;
    usingIdCard;
    usingWechatUser;
    usingEmail;
    constructor(userId, usingPassword, usingIdCard, usingWechatUser, usingEmail, message) {
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
}
;
export class OakChangeLoginWayException extends OakUserException {
    userId;
    usingIdCard;
    usingWechatUser;
    usingEmail;
    constructor(userId, usingIdCard, usingWechatUser, usingEmail, message) {
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
    constructor(message) {
        super(message || '您需要先登记手机号');
    }
}
export class OakUserInfoUncompletedException extends OakUserException {
    constructor(message) {
        super(message || '您需要先填写完整的用户信息');
    }
}
export class OakUserDisabledException extends OakUserException {
    constructor(message) {
        super(message || '您的帐户已被禁用，请联系系统管理员');
    }
}
export class OakTokenExpiredException extends OakUserException {
    constructor(message) {
        super(message || '当前登录状态已经过期');
    }
}
export class OakMpHaveToSubscribeMessage extends Error {
    rejectedMessageType;
    constructor(rejectedMessageType, message) {
        super(message || '您需要订阅消息，以获得更好的用户体验');
        this.rejectedMessageType = rejectedMessageType;
    }
}
export class OakUserInfoLoadingException extends OakUserException {
    constructor(message) {
        super(message || '正在装载用户信息');
    }
}
;
export class OakUploadException extends OakUserException {
    constructor(message) {
        super(message || '上传文件失败');
    }
}
;
export function makeException(data) {
    const exception = makeException2(data);
    if (exception) {
        return exception;
    }
    const { name, message, opRecords } = data;
    switch (name) {
        case 'OakNotEnoughMoneyException': {
            const e = new OakNotEnoughMoneyException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakDistinguishUserException': {
            const e = new OakDistinguishUserException(data.userId, data.usingPassword, data.usingIdCard, data.usingWechatUser, data.usingEmail, message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUserDisabledException': {
            const e = new OakUserDisabledException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakTokenExpiredException': {
            const e = new OakTokenExpiredException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakMobileUnsetException': {
            const e = new OakMobileUnsetException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUserInfoUncompletedException': {
            const e = new OakUserInfoUncompletedException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUserInfoLoadingException': {
            const e = new OakUserInfoLoadingException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUploadException': {
            const e = new OakUploadException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        default: {
            return;
        }
    }
}
