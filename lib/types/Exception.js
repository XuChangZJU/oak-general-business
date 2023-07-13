"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeException = exports.OakUserInfoLoadingException = exports.OakMpHaveToSubscribeMessage = exports.OakTokenExpiredException = exports.OakUserDisabledException = exports.OakUserInfoUncompletedException = exports.OakMobileUnsetException = exports.OakChangeLoginWayException = exports.OakDistinguishUserException = exports.OakNotEnoughMoneyException = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var OakNotEnoughMoneyException = /** @class */ (function (_super) {
    tslib_1.__extends(OakNotEnoughMoneyException, _super);
    function OakNotEnoughMoneyException(message) {
        return _super.call(this, message || '您的余额不足') || this;
    }
    return OakNotEnoughMoneyException;
}(types_1.OakUserException));
exports.OakNotEnoughMoneyException = OakNotEnoughMoneyException;
;
var OakDistinguishUserException = /** @class */ (function (_super) {
    tslib_1.__extends(OakDistinguishUserException, _super);
    function OakDistinguishUserException(userId, usingPassword, usingIdCard, usingWechatUser, usingEmail, message) {
        var _this = _super.call(this, message || '系统中发现相同帐户，需要您加以甄别') || this;
        _this.userId = userId;
        _this.usingIdCard = usingIdCard;
        _this.usingPassword = usingPassword;
        _this.usingWechatUser = usingWechatUser;
        _this.usingEmail = usingEmail;
        return _this;
    }
    OakDistinguishUserException.prototype.toString = function () {
        return JSON.stringify({
            name: this.constructor.name,
            message: this.message,
            userId: this.userId,
            usingIdCard: this.usingIdCard,
            usingPassword: this.usingPassword,
            usingWechatUser: this.usingWechatUser,
            usingEmail: this.usingEmail,
        });
    };
    return OakDistinguishUserException;
}(types_1.OakUserException));
exports.OakDistinguishUserException = OakDistinguishUserException;
;
var OakChangeLoginWayException = /** @class */ (function (_super) {
    tslib_1.__extends(OakChangeLoginWayException, _super);
    function OakChangeLoginWayException(userId, usingIdCard, usingWechatUser, usingEmail, message) {
        var _this = _super.call(this, message || '系统中发现相同帐户，需要您加以甄别') || this;
        _this.userId = userId;
        _this.usingIdCard = usingIdCard;
        _this.usingWechatUser = usingWechatUser;
        _this.usingEmail = usingEmail;
        return _this;
    }
    OakChangeLoginWayException.prototype.toString = function () {
        return JSON.stringify({
            name: this.constructor.name,
            message: this.message,
            userId: this.userId,
            usingIdCard: this.usingIdCard,
            usingWechatUser: this.usingWechatUser,
            usingEmail: this.usingEmail,
        });
    };
    return OakChangeLoginWayException;
}(types_1.OakUserException));
exports.OakChangeLoginWayException = OakChangeLoginWayException;
var OakMobileUnsetException = /** @class */ (function (_super) {
    tslib_1.__extends(OakMobileUnsetException, _super);
    function OakMobileUnsetException(message) {
        return _super.call(this, message || '您需要先登记手机号') || this;
    }
    return OakMobileUnsetException;
}(types_1.OakUserException));
exports.OakMobileUnsetException = OakMobileUnsetException;
var OakUserInfoUncompletedException = /** @class */ (function (_super) {
    tslib_1.__extends(OakUserInfoUncompletedException, _super);
    function OakUserInfoUncompletedException(message) {
        return _super.call(this, message || '您需要先填写完整的用户信息') || this;
    }
    return OakUserInfoUncompletedException;
}(types_1.OakUserException));
exports.OakUserInfoUncompletedException = OakUserInfoUncompletedException;
var OakUserDisabledException = /** @class */ (function (_super) {
    tslib_1.__extends(OakUserDisabledException, _super);
    function OakUserDisabledException(message) {
        return _super.call(this, message || '您的帐户已被禁用，请联系系统管理员') || this;
    }
    return OakUserDisabledException;
}(types_1.OakUserException));
exports.OakUserDisabledException = OakUserDisabledException;
var OakTokenExpiredException = /** @class */ (function (_super) {
    tslib_1.__extends(OakTokenExpiredException, _super);
    function OakTokenExpiredException(message) {
        return _super.call(this, message || '当前登录状态已经过期') || this;
    }
    return OakTokenExpiredException;
}(types_1.OakUserException));
exports.OakTokenExpiredException = OakTokenExpiredException;
var OakMpHaveToSubscribeMessage = /** @class */ (function (_super) {
    tslib_1.__extends(OakMpHaveToSubscribeMessage, _super);
    function OakMpHaveToSubscribeMessage(rejectedMessageType, message) {
        var _this = _super.call(this, message || '您需要订阅消息，以获得更好的用户体验') || this;
        _this.rejectedMessageType = rejectedMessageType;
        return _this;
    }
    return OakMpHaveToSubscribeMessage;
}(Error));
exports.OakMpHaveToSubscribeMessage = OakMpHaveToSubscribeMessage;
var OakUserInfoLoadingException = /** @class */ (function (_super) {
    tslib_1.__extends(OakUserInfoLoadingException, _super);
    function OakUserInfoLoadingException(message) {
        return _super.call(this, message || '正在装载用户信息') || this;
    }
    return OakUserInfoLoadingException;
}(types_1.OakUserException));
exports.OakUserInfoLoadingException = OakUserInfoLoadingException;
;
function makeException(data) {
    var exception = (0, types_1.makeException)(data);
    if (exception) {
        return exception;
    }
    var name = data.name, message = data.message, opRecords = data.opRecords;
    switch (name) {
        case 'OakNotEnoughMoneyException': {
            var e = new OakNotEnoughMoneyException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakDistinguishUserException': {
            var e = new OakDistinguishUserException(data.userId, data.usingPassword, data.usingIdCard, data.usingWechatUser, data.usingEmail, message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUserDisabledException': {
            var e = new OakUserDisabledException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakTokenExpiredException': {
            var e = new OakTokenExpiredException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakMobileUnsetException': {
            var e = new OakMobileUnsetException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUserInfoUncompletedException': {
            var e = new OakUserInfoUncompletedException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        case 'OakUserInfoLoadingException': {
            var e = new OakUserInfoLoadingException(message);
            e.setOpRecords(opRecords);
            return e;
        }
        default: {
            return;
        }
    }
}
exports.makeException = makeException;
