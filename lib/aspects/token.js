"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWechatMp = exports.loginByPassword = exports.loginMp = void 0;
const assert_1 = __importDefault(require("assert"));
async function loginMp(params, context) {
    const { rowStore } = context;
    throw new Error('method not implemented!');
}
exports.loginMp = loginMp;
async function loginByPassword(params, context) {
    const { rowStore } = context;
    const { result: [mobile] } = await rowStore.select('mobile', {
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
        },
    }, context);
    throw new Error('method not implemented!');
}
exports.loginByPassword = loginByPassword;
async function loginWechatMp(code, context) {
    const application = await context.getApplication();
    const { type, config } = application;
    (0, assert_1.default)(type === 'wechatMp' || config.type === 'wechatMp');
    const config2 = config;
    new Error('method not implemented!');
}
exports.loginWechatMp = loginWechatMp;
/* export type AspectDict<ED extends EntityDict> = {
    loginMp: (params: { code: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
    loginByPassword: (params: { password: string, mobile: string }, context: GeneralRuntimeContext<ED>) => Promise<string>;
};
 */ 
