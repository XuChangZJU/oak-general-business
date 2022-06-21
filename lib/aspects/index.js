"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectDict = void 0;
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
const oak_common_aspect_1 = __importDefault(require("oak-common-aspect"));
const lodash_1 = require("lodash");
exports.aspectDict = (0, lodash_1.assign)({
    loginByPassword: token_1.loginByPassword,
    loginMp: token_1.loginMp,
    loginWechatMp: token_1.loginWechatMp,
    syncUserInfoWechatMp: token_1.syncUserInfoWechatMp,
    getUploadInfo: extraFile_1.getUploadInfo,
}, oak_common_aspect_1.default);
// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;
