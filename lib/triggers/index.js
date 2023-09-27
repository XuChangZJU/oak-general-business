"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const address_1 = tslib_1.__importDefault(require("./address"));
const user_1 = tslib_1.__importDefault(require("./user"));
const userEntityGrant_1 = tslib_1.__importDefault(require("./userEntityGrant"));
const wechatQrCode_1 = tslib_1.__importDefault(require("./wechatQrCode"));
const message_1 = tslib_1.__importDefault(require("./message"));
const notification_1 = tslib_1.__importDefault(require("./notification"));
const wechatLogin_1 = tslib_1.__importDefault(require("./wechatLogin"));
const application_1 = tslib_1.__importDefault(require("./application"));
const articleMenu_1 = tslib_1.__importDefault(require("./articleMenu"));
const article_1 = tslib_1.__importDefault(require("./article"));
const parasite_1 = tslib_1.__importDefault(require("./parasite"));
const extraFile_1 = tslib_1.__importDefault(require("./extraFile"));
const sessionMessage_1 = tslib_1.__importDefault(require("./sessionMessage"));
const wechatMenu_1 = tslib_1.__importDefault(require("./wechatMenu"));
const wechatPublicTag_1 = tslib_1.__importDefault(require("./wechatPublicTag"));
exports.default = [
    ...application_1.default,
    ...address_1.default,
    ...user_1.default,
    ...userEntityGrant_1.default,
    ...wechatQrCode_1.default,
    ...message_1.default,
    ...notification_1.default,
    ...wechatLogin_1.default,
    ...articleMenu_1.default,
    ...article_1.default,
    ...parasite_1.default,
    ...extraFile_1.default,
    ...sessionMessage_1.default,
    ...wechatMenu_1.default,
    ...wechatPublicTag_1.default,
];
