"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectDict = void 0;
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
// import  commonAspectDict from 'oak-common-aspect';
const lodash_1 = require("lodash");
exports.aspectDict = (0, lodash_1.assign)({
    loginByMobile: token_1.loginByMobile,
    loginMp: token_1.loginMp,
    loginWechatMp: token_1.loginWechatMp,
    syncUserInfoWechatMp: token_1.syncUserInfoWechatMp,
    getUploadInfo: extraFile_1.getUploadInfo,
    sendCaptcha: token_1.sendCaptcha,
} /* , commonAspectDict */);
// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;
