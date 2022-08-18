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
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakPage({
    path: 'wechatQrCode:scan',
    entity: 'wechatQrCode',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        type: 1,
        ticket: 1,
        url: 1,
        expired: 1,
        buffer: 1,
        props: 1,
    },
    isList: true,
    filters: [
        {
            filter: function (_a) {
                var onLoadOptions = _a.onLoadOptions;
                return __awaiter(void 0, void 0, void 0, function () {
                    var scene, uuid;
                    return __generator(this, function (_b) {
                        scene = decodeURIComponent(onLoadOptions.scene);
                        uuid = scene && (0, uuid_1.expandUuidTo36Bytes)(scene);
                        return [2 /*return*/, {
                                id: uuid,
                            }];
                    });
                });
            },
        },
    ],
    formData: function (_a) {
        var wechatQrCodes = _a.data;
        return __awaiter(this, void 0, void 0, function () {
            var wechatQrCode, _b, props, pathname, url, param, param2;
            return __generator(this, function (_c) {
                wechatQrCode = wechatQrCodes[0];
                if (!wechatQrCode) {
                    return [2 /*return*/, {
                            isExist: false,
                        }];
                }
                if (!wechatQrCode.expired) {
                    _b = wechatQrCode.props, props = _b.props, pathname = _b.pathname;
                    url = pathname.substring(0, 1) === '/'
                        ? pathname
                        : "/".concat(pathname);
                    if (props) {
                        for (param in props) {
                            param2 = param;
                            url += url.includes('?') ? '&' : '?';
                            url += "".concat(param, "=").concat(typeof props[param2] === 'string'
                                ? props[param2]
                                : JSON.stringify(props[param2]));
                        }
                    }
                    this.redirectTo({
                        url: url,
                    });
                    return [2 /*return*/, {
                            expired: false,
                        }];
                }
                else {
                    return [2 /*return*/, {
                            expired: true,
                        }];
                }
                return [2 /*return*/];
            });
        });
    },
});
