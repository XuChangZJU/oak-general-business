"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const sha1_1 = __importDefault(require("sha1"));
function encryptPassword(password) {
    return (0, sha1_1.default)(password);
}
exports.encryptPassword = encryptPassword;
