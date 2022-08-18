"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPasswordSha1 = void 0;
var tslib_1 = require("tslib");
var sha1_1 = tslib_1.__importDefault(require("sha1"));
function encryptPasswordSha1(password) {
    return (0, sha1_1.default)(password);
}
exports.encryptPasswordSha1 = encryptPasswordSha1;
