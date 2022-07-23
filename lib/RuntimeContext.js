"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralRuntimeContext = void 0;
var UniversalContext_1 = require("oak-domain/lib/store/UniversalContext");
var concurrent_1 = require("oak-domain/lib/utils/concurrent");
var assert_1 = require("oak-domain/lib/utils/assert");
var GeneralRuntimeContext = /** @class */ (function (_super) {
    __extends(GeneralRuntimeContext, _super);
    function GeneralRuntimeContext(store, applicationId) {
        var _this = _super.call(this, store) || this;
        _this.rwLockApplication = new concurrent_1.RWLock();
        _this.applicationId = applicationId;
        if (!applicationId) {
            _this.rwLockApplication.acquire('X');
        }
        return _this;
    }
    GeneralRuntimeContext.prototype.getApplicationId = function () {
        return this.applicationId;
    };
    GeneralRuntimeContext.prototype.getSystemId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getApplication()];
                    case 1:
                        app = _a.sent();
                        return [2 /*return*/, app === null || app === void 0 ? void 0 : app.systemId];
                }
            });
        });
    };
    GeneralRuntimeContext.prototype.setToken = function (token) {
        this.token = token;
    };
    GeneralRuntimeContext.prototype.getApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, application;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rwLockApplication.acquire('X')];
                    case 1:
                        _b.sent();
                        if (!this.application) return [3 /*break*/, 2];
                        result = this.application;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.applicationId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.rowStore.select('application', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                    type: 1,
                                    systemId: 1,
                                    system: {
                                        id: 1,
                                        name: 1,
                                        config: 1,
                                    },
                                },
                                filter: {
                                    id: this.applicationId,
                                },
                            }, this)];
                    case 3:
                        _a = __read.apply(void 0, [(_b.sent()).result, 1]), application = _a[0];
                        result = application;
                        this.application = application;
                        _b.label = 4;
                    case 4:
                        this.rwLockApplication.release();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    GeneralRuntimeContext.prototype.setApplication = function (app) {
        (0, assert_1.assert)(!this.application);
        this.application = app;
        this.applicationId = app.id;
        this.rwLockApplication.release();
    };
    GeneralRuntimeContext.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenValue, _a, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tokenValue = this.token;
                        if (!tokenValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rowStore.select('token', {
                                data: {
                                    id: 1,
                                    userId: 1,
                                    playerId: 1,
                                },
                                filter: {
                                    id: tokenValue,
                                    ableState: 'enabled',
                                }
                            }, this)];
                    case 1:
                        _a = __read.apply(void 0, [(_b.sent()).result, 1]), token = _a[0];
                        return [2 /*return*/, token];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    GeneralRuntimeContext.prototype.getTokenValue = function () {
        return this.token;
    };
    GeneralRuntimeContext.prototype.toString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, scene;
            return __generator(this, function (_a) {
                data = {
                    applicationId: this.getApplicationId(),
                };
                if (this.token) {
                    Object.assign(data, {
                        token: this.token,
                    });
                }
                scene = this.getScene();
                if (scene) {
                    Object.assign(data, {
                        scene: scene,
                    });
                }
                return [2 /*return*/, JSON.stringify(data)];
            });
        });
    };
    GeneralRuntimeContext.fromString = function (strCxt) {
        var _a = JSON.parse(strCxt), applicationId = _a.applicationId, scene = _a.scene, token = _a.token;
        return {
            applicationId: applicationId,
            scene: scene,
            token: token,
        };
    };
    return GeneralRuntimeContext;
}(UniversalContext_1.UniversalContext));
exports.GeneralRuntimeContext = GeneralRuntimeContext;
;
