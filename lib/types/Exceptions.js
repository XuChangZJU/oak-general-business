"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeException = exports.OakUserDisabledException = exports.OakDistinguishUserByBusinessException = exports.OakDistinguishUserByWechatUserException = exports.OakNotEnoughMoneyException = exports.OakUnloggedInException = void 0;
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
class OakDistinguishUserByWechatUserException extends types_1.OakUserException {
    userId;
    constructor(userId, message) {
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
exports.OakDistinguishUserByWechatUserException = OakDistinguishUserByWechatUserException;
class OakDistinguishUserByBusinessException extends types_1.OakUserException {
    userId;
    constructor(userId, message) {
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
exports.OakDistinguishUserByBusinessException = OakDistinguishUserByBusinessException;
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
exports.makeException = makeException;
