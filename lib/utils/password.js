"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPasswordSha1 = void 0;
const sha1_1 = __importDefault(require("sha1"));
function encryptPasswordSha1(password) {
    return (0, sha1_1.default)(password);
}
exports.encryptPasswordSha1 = encryptPasswordSha1;
