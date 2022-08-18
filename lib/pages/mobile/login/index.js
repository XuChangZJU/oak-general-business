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
var SEND_KEY = 'captcha:sendAt';
exports.default = OakPage({
    path: 'mobile:me',
    isList: false,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        password: '',
        captcha: '',
        counter: 0,
    },
    properties: {
        onlyCaptcha: Boolean,
        onlyPassword: Boolean,
        eventLoggedIn: String,
    },
    formData: function (_a) {
        var features = _a.features;
        return __awaiter(this, void 0, void 0, function () {
            var lastSendAt, now, counter;
            var _this = this;
            return __generator(this, function (_b) {
                lastSendAt = features.localStorage.load(SEND_KEY);
                now = Date.now();
                counter = 0;
                if (typeof lastSendAt === 'number') {
                    counter = Math.max(60 - Math.ceil((now - lastSendAt) / 1000), 0);
                    if (counter > 0) {
                        this.counterHandler = setTimeout(function () { return _this.reRender(); }, 1000);
                    }
                    else if (this.counterHandler) {
                        clearTimeout(this.counterHandler);
                        this.counterHandler = undefined;
                    }
                }
                return [2 /*return*/, {
                        counter: counter,
                    }];
            });
        });
    },
    methods: {
        onInput: function (e) {
            var _a;
            var _b = this.resolveInput(e), dataset = _b.dataset, value = _b.value;
            var attr = dataset.attr;
            this.setState((_a = {},
                _a[attr] = value,
                _a));
        },
        sendCaptcha: function () {
            return __awaiter(this, void 0, void 0, function () {
                var mobile, result, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mobile = this.state.mobile;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.sendCaptcha(mobile)];
                        case 2:
                            result = _a.sent();
                            // 显示返回消息
                            this.setMessage({
                                type: 'success',
                                content: result,
                            });
                            this.save(SEND_KEY, Date.now());
                            this.reRender();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_1.message,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        loginByMobile: function () {
            return __awaiter(this, void 0, void 0, function () {
                var eventLoggedIn, _a, mobile, password, captcha, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            eventLoggedIn = this.props.eventLoggedIn;
                            _a = this.state, mobile = _a.mobile, password = _a.password, captcha = _a.captcha;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.loginByMobile(mobile, password, captcha)];
                        case 2:
                            _b.sent();
                            if (eventLoggedIn) {
                                this.pub(eventLoggedIn);
                            }
                            else {
                                this.navigateBack();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _b.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_2.message,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    },
});
