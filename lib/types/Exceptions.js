"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OakNotEnoughMoneyException = exports.OakUnloggedInException = void 0;
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
