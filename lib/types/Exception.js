"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeException = exports.OakTokenExpiredException = exports.OakUserDisabledException = exports.OakChangeLoginWayException = exports.OakDistinguishUserException = exports.OakNotEnoughMoneyException = void 0;
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
function makeException(data) {
    var exception = (0, types_1.makeException)(data);
    if (exception) {
        return exception;
    }
    var name = data.name, message = data.message;
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
        default: {
            return;
        }
    }
}
exports.makeException = makeException;
