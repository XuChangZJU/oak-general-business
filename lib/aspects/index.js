"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const aspectDict = {
    loginByPassword: token_1.loginByPassword,
    loginMp: token_1.loginMp,
};
exports.default = aspectDict;
// export type AspectDict<ED extends EntityDict & BaseEntityDict> = TokenAD<ED> & CrudAD<ED>;
