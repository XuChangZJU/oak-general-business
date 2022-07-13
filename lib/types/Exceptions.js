"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeException = exports.OakUserDisabledException = exports.OakChangLoginWayException = exports.OakDistinguishUserException = exports.OakNotEnoughMoneyException = exports.OakUnloggedInException = void 0;
const types_1 = require("oak-domain/lib/types");
class OakUnloggedInException extends types_1.OakUserException {
    constructor(message) {
        super(message || '您尚未登录');
    }
}
exports.OakUnloggedInException = OakUnloggedInException;
;
class OakNotEnoughMoneyException extends types_1.OakUserException {
    constructor(message) {
        super(message || '您的余额不足');
    }
}
exports.OakNotEnoughMoneyException = OakNotEnoughMoneyException;
;
class OakDistinguishUserException extends types_1.OakUserException {
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
exports.OakDistinguishUserException = OakDistinguishUserException;
;
class OakChangLoginWayException extends types_1.OakUserException {
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
exports.OakChangLoginWayException = OakChangLoginWayException;
class OakUserDisabledException extends types_1.OakUserException {
    constructor(message) {
        super(message || '您的帐户已被禁用，请联系系统管理员');
    }
}
exports.OakUserDisabledException = OakUserDisabledException;
function makeException(data) {
    const exception = (0, types_1.makeException)(data);
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
exports.makeException = makeException;
