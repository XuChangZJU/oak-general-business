"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeException = exports.OakUserDisabledException = exports.OakChangLoginWayException = exports.OakDistinguishUserException = exports.OakNotEnoughMoneyException = exports.OakUnloggedInException = void 0;
var types_1 = require("oak-domain/lib/types");
var OakUnloggedInException = /** @class */ (function (_super) {
    __extends(OakUnloggedInException, _super);
    function OakUnloggedInException(message) {
        return _super.call(this, message || '您尚未登录') || this;
    }
    return OakUnloggedInException;
}(types_1.OakUserException));
exports.OakUnloggedInException = OakUnloggedInException;
;
var OakNotEnoughMoneyException = /** @class */ (function (_super) {
    __extends(OakNotEnoughMoneyException, _super);
    function OakNotEnoughMoneyException(message) {
        return _super.call(this, message || '您的余额不足') || this;
    }
    return OakNotEnoughMoneyException;
}(types_1.OakUserException));
exports.OakNotEnoughMoneyException = OakNotEnoughMoneyException;
;
var OakDistinguishUserException = /** @class */ (function (_super) {
    __extends(OakDistinguishUserException, _super);
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
var OakChangLoginWayException = /** @class */ (function (_super) {
    __extends(OakChangLoginWayException, _super);
    function OakChangLoginWayException(userId, usingIdCard, usingWechatUser, usingEmail, message) {
        var _this = _super.call(this, message || '系统中发现相同帐户，需要您加以甄别') || this;
        _this.userId = userId;
        _this.usingIdCard = usingIdCard;
        _this.usingWechatUser = usingWechatUser;
        _this.usingEmail = usingEmail;
        return _this;
    }
    OakChangLoginWayException.prototype.toString = function () {
        return JSON.stringify({
            name: this.constructor.name,
            message: this.message,
            userId: this.userId,
            usingIdCard: this.usingIdCard,
            usingWechatUser: this.usingWechatUser,
            usingEmail: this.usingEmail,
        });
    };
    return OakChangLoginWayException;
}(types_1.OakUserException));
exports.OakChangLoginWayException = OakChangLoginWayException;
var OakUserDisabledException = /** @class */ (function (_super) {
    __extends(OakUserDisabledException, _super);
    function OakUserDisabledException(message) {
        return _super.call(this, message || '您的帐户已被禁用，请联系系统管理员') || this;
    }
    return OakUserDisabledException;
}(types_1.OakUserException));
exports.OakUserDisabledException = OakUserDisabledException;
function makeException(data) {
    var exception = (0, types_1.makeException)(data);
    if (exception) {
        return exception;
    }
    var name = data.name, message = data.message;
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
