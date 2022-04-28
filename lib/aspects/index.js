"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aspectDict = void 0;
const token_1 = require("./token");
exports.aspectDict = {
    loginByPassword: token_1.loginByPassword,
    loginMp: token_1.loginMp,
    loginWechatMp: token_1.loginWechatMp,
};
// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;
