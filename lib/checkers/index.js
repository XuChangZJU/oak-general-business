"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const address_1 = tslib_1.__importDefault(require("./address"));
const token_1 = tslib_1.__importDefault(require("./token"));
const user_1 = tslib_1.__importDefault(require("./user"));
const userEntityGrant_1 = tslib_1.__importDefault(require("./userEntityGrant"));
const wechatQrCode_1 = tslib_1.__importDefault(require("./wechatQrCode"));
const application_1 = tslib_1.__importDefault(require("./application"));
const mobile_1 = tslib_1.__importDefault(require("./mobile"));
const wechatPublicTag_1 = tslib_1.__importDefault(require("./wechatPublicTag"));
const message_1 = tslib_1.__importDefault(require("./message"));
const parasite_1 = tslib_1.__importDefault(require("./parasite"));
const checkers = [
    ...mobile_1.default,
    ...address_1.default,
    ...token_1.default,
    ...user_1.default,
    ...userEntityGrant_1.default,
    ...wechatQrCode_1.default,
    ...application_1.default,
    ...wechatPublicTag_1.default,
    ...message_1.default,
    ...parasite_1.default,
];
exports.default = checkers;
