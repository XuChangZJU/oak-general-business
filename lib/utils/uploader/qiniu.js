"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Qiniu = /** @class */ (function () {
    function Qiniu() {
        this.name = 'qiniu';
    }
    Qiniu.prototype.formUploadMeta = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                throw new Error('method not implemented');
            });
        });
    };
    Qiniu.prototype.getUploadInfo = function (extraFile) {
        throw new Error('method not implemented');
        return {};
    };
    Qiniu.prototype.checkWhetherSuccess = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                throw new Error('method not implemented');
            });
        });
    };
    Qiniu.prototype.removeFile = function (extraFile, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                throw new Error('method not implemented');
            });
        });
    };
    return Qiniu;
}());
exports.default = Qiniu;
;
