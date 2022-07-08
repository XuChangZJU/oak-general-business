"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const fingerprintjs_1 = __importDefault(require("@fingerprintjs/fingerprintjs"));
const lodash_1 = require("lodash");
/**
 * fingerprintJs当中的一些敏感项
 * @returns
 */
async function getEnv() {
    const fp = await fingerprintjs_1.default.load();
    const result = await fp.get();
    const { visitorId, components } = result;
    return (0, lodash_1.assign)((0, lodash_1.pick)(components, [
        'platform',
        'timezone',
        'vendor',
        'vendorFlavors'
    ]), {
        type: 'web',
        visitorId,
    });
}
exports.getEnv = getEnv;
