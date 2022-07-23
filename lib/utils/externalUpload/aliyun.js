"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var buffer_1 = require("buffer");
var aliyunInstance = /** @class */ (function () {
    function aliyunInstance(config) {
        var accessKey = config.accessKey, secretKey = config.secretKey, uploadHost = config.uploadHost, bucket = config.bucket, domain = config.domain;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.uploadHost = uploadHost;
        this.bucket = bucket;
        this.domain = domain;
    }
    aliyunInstance.prototype.getUploadInfo = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uploadHost, domain, bucket, accessKey, key, policy, signature;
            return __generator(this, function (_b) {
                try {
                    _a = this, uploadHost = _a.uploadHost, domain = _a.domain, bucket = _a.bucket, accessKey = _a.accessKey;
                    key = "".concat(Date.now(), "/").concat(fileName);
                    policy = this.getPolicyBase64();
                    signature = this.getSignature(policy);
                    return [2 /*return*/, {
                            key: key,
                            signature: signature,
                            policy: policy,
                            uploadHost: uploadHost,
                            bucket: bucket,
                            domain: domain,
                            accessKey: accessKey,
                        }];
                }
                catch (err) {
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    aliyunInstance.prototype.getPolicyBase64 = function (timeout) {
        if (timeout === void 0) { timeout = 8000; }
        var date = new Date();
        date.setHours(date.getHours() + timeout);
        var policyText = {
            expiration: date.toISOString(),
            conditions: [
                ['content-length-range', 0, 5 * 1024 * 1024], // 设置上传文件的大小限制,5mb
            ],
        };
        var policyBase64 = this.urlSafeBase64Encode(JSON.stringify(policyText));
        return policyBase64;
    };
    aliyunInstance.prototype.getSignature = function (policyBase64) {
        var encoded = this.hmacSha1(policyBase64, this.secretKey);
        ;
        var signature = this.base64ToUrlSafe(encoded);
        return signature;
    };
    aliyunInstance.prototype.hmacSha1 = function (encodedFlags, secretKey) {
        var hmac = crypto_1.default.createHmac('sha1', secretKey);
        hmac.update(encodedFlags);
        return hmac.digest('base64');
    };
    aliyunInstance.prototype.urlSafeBase64Encode = function (jsonFlags) {
        var encoded = buffer_1.Buffer.from(jsonFlags).toString('base64');
        return this.base64ToUrlSafe(encoded);
    };
    aliyunInstance.prototype.base64ToUrlSafe = function (v) {
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    };
    return aliyunInstance;
}());
exports.default = aliyunInstance;
