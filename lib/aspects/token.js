"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginByPassword = exports.loginMp = void 0;
async function loginMp(params, context) {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
exports.loginMp = loginMp;
async function loginByPassword(params, context) {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
exports.loginByPassword = loginByPassword;
/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: RuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: RuntimeContext<ED>) => Promise<string>;
};
 */ 
