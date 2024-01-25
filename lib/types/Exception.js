"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeException = exports.OakUploadException = exports.OakApplicationLoadingException = exports.OakUserInfoLoadingException = exports.OakMpHaveToSubscribeMessage = exports.OakTokenExpiredException = exports.OakUserDisabledException = exports.OakUserInfoUncompletedException = exports.OakMobileUnsetException = exports.OakChangeLoginWayException = exports.OakDistinguishUserException = exports.OakNotEnoughMoneyException = void 0;
const types_1 = require("oak-domain/lib/types");
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
class OakChangeLoginWayException extends types_1.OakUserException {
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
exports.OakChangeLoginWayException = OakChangeLoginWayException;
class OakMobileUnsetException extends types_1.OakUserException {
    constructor(message) {
        super(message || '您需要先登记手机号');
    }
}
exports.OakMobileUnsetException = OakMobileUnsetException;
class OakUserInfoUncompletedException extends types_1.OakUserException {
    constructor(message) {
        super(message || '您需要先填写完整的用户信息');
    }
}
exports.OakUserInfoUncompletedException = OakUserInfoUncompletedException;
class OakUserDisabledException extends types_1.OakUserException {
    constructor(message) {
        super(message || '您的帐户已被禁用，请联系系统管理员');
    }
}
exports.OakUserDisabledException = OakUserDisabledException;
class OakTokenExpiredException extends types_1.OakUserException {
    constructor(message) {
        super(message || '当前登录状态已经过期');
    }
}
exports.OakTokenExpiredException = OakTokenExpiredException;
class OakMpHaveToSubscribeMessage extends Error {
    rejectedMessageType;
    constructor(rejectedMessageType, message) {
        super(message || '您需要订阅消息，以获得更好的用户体验');
        this.rejectedMessageType = rejectedMessageType;
    }
}
exports.OakMpHaveToSubscribeMessage = OakMpHaveToSubscribeMessage;
/**
 * 前端用户信息还没加载完整
 */
class OakUserInfoLoadingException extends types_1.OakException {
    constructor(message) {
        super(message || '正在装载用户信息');
    }
}
exports.OakUserInfoLoadingException = OakUserInfoLoadingException;
;
/**
 * 前端application信息还没加载完整
 */
class OakApplicationLoadingException extends types_1.OakException {
    constructor(message) {
        super(message || '正在装载应用信息');
    }
}
exports.OakApplicationLoadingException = OakApplicationLoadingException;
;
class OakUploadException extends types_1.OakUserException {
    constructor(message) {
        super(message || '上传文件失败');
    }
}
exports.OakUploadException = OakUploadException;
;
function makeException(data) {
    const exception = (0, types_1.makeException)(data);
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
exports.makeException = makeException;
