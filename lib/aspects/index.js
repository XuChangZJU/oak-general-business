"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectDict = void 0;
var token_1 = require("./token");
var extraFile_1 = require("./extraFile");
var application_1 = require("./application");
// import  commonAspectDict from 'oak-common-aspect';
exports.aspectDict = {
    loginByMobile: token_1.loginByMobile,
    loginMp: token_1.loginMp,
    loginWechatMp: token_1.loginWechatMp,
    syncUserInfoWechatMp: token_1.syncUserInfoWechatMp,
    getUploadInfo: extraFile_1.getUploadInfo,
    sendCaptcha: token_1.sendCaptcha,
    getApplication: application_1.getApplication,
};
// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;
