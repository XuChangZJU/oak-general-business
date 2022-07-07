"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const token_1 = __importDefault(require("./token"));
const user_1 = __importDefault(require("./user"));
const userEntityGrant_1 = __importDefault(require("./userEntityGrant"));
const wechatQrCode_1 = __importDefault(require("./wechatQrCode"));
const check_1 = require("../utils/check");
const checkers = [
    ...address_1.default,
    ...token_1.default,
    ...user_1.default,
    ...userEntityGrant_1.default,
    ...wechatQrCode_1.default,
];
(0, check_1.processCheckers)(checkers);
exports.default = checkers;
