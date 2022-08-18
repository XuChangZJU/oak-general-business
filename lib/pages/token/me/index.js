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
var constants_1 = require("../../../constants");
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakPage({
    path: 'token:me',
    entity: 'token',
    isList: true,
    projection: {
        id: 1,
        userId: 1,
        playerId: 1,
        user: {
            id: 1,
            nickname: 1,
            name: 1,
            extraFile$entity: {
                $entity: 'extraFile',
                data: {
                    id: 1,
                    tag1: 1,
                    origin: 1,
                    bucket: 1,
                    objectId: 1,
                    filename: 1,
                    extra1: 1,
                    type: 1,
                    entity: 1,
                    extension: 1,
                },
                filter: {
                    tag1: 'avatar',
                },
                indexFrom: 0,
                count: 1,
            },
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    mobile: 1,
                },
            },
        },
        player: {
            id: 1,
            userRole$user: {
                $entity: 'userRole',
                data: {
                    id: 1,
                    userId: 1,
                    roleId: 1,
                },
            },
        },
    },
    filters: [{
            filter: function (_a) {
                var features = _a.features;
                return __awaiter(void 0, void 0, void 0, function () {
                    var tokenId;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, features.token.getToken()];
                            case 1:
                                tokenId = _b.sent();
                                if (tokenId) {
                                    return [2 /*return*/, {
                                            id: tokenId,
                                        }];
                                }
                                return [2 /*return*/, {
                                        id: 'none',
                                    }];
                        }
                    });
                });
            },
        }],
    formData: function (_a) {
        var _b = __read(_a.data, 1), token = _b[0];
        return __awaiter(void 0, void 0, void 0, function () {
            var user, player, avatarFile, avatar, nickname, mobileData, mobile, mobileCount, isLoggedIn, isPlayingAnother, isRoot;
            var _c, _d;
            return __generator(this, function (_e) {
                user = token === null || token === void 0 ? void 0 : token.user;
                player = token === null || token === void 0 ? void 0 : token.player;
                avatarFile = user && user.extraFile$entity && user.extraFile$entity[0];
                avatar = avatarFile && (0, extraFile_1.composeFileUrl)(avatarFile);
                nickname = user && user.nickname;
                mobileData = user && user.mobile$user && user.mobile$user[0];
                mobile = (mobileData || {}).mobile;
                mobileCount = ((_c = user === null || user === void 0 ? void 0 : user.mobile$user) === null || _c === void 0 ? void 0 : _c.length) || 0;
                isLoggedIn = !!token;
                isPlayingAnother = token && token.userId !== token.playerId;
                isRoot = (player === null || player === void 0 ? void 0 : player.userRole$user) &&
                    ((_d = player.userRole$user[0]) === null || _d === void 0 ? void 0 : _d.roleId) === constants_1.ROOT_ROLE_ID;
                return [2 /*return*/, {
                        avatar: avatar,
                        nickname: nickname,
                        mobile: mobile,
                        mobileCount: mobileCount,
                        isLoggedIn: isLoggedIn,
                        isPlayingAnother: isPlayingAnother,
                        isRoot: isRoot,
                    }];
            });
        });
    },
    data: {
        refreshing: false,
        showDrawer: false,
    },
    methods: {
        setValue: function (input) {
            var _a = this.resolveInput(input), dataset = _a.dataset, value = _a.value;
            this.setUpdateData(dataset.attr, value);
        },
        onRefresh: function () {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({
                                refreshing: true,
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.syncUserInfoWechatMp()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [3 /*break*/, 4];
                        case 4:
                            this.setState({
                                refreshing: false,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        doLogin: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, eventLoggedIn, err_2;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.setState({
                                refreshing: true,
                            });
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, , 7]);
                            _a = process.env.OAK_PLATFORM;
                            switch (_a) {
                                case 'wechatMp': return [3 /*break*/, 2];
                                case 'web': return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 5];
                        case 2: return [4 /*yield*/, this.features.token.loginWechatMp()];
                        case 3:
                            _b.sent();
                            this.setState({
                                refreshing: false,
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            {
                                eventLoggedIn = "token:me:login:".concat(Date.now());
                                this.sub(eventLoggedIn, function () {
                                    _this.navigateBack();
                                });
                                this.navigateTo({
                                    url: '/mobile/login',
                                    eventLoggedIn: eventLoggedIn,
                                });
                                return [3 /*break*/, 5];
                            }
                            _b.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            err_2 = _b.sent();
                            console.error(err_2);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        goMyMobile: function () {
            this.navigateTo({
                url: '/mobile/me',
            });
        },
        goUserManage: function () {
            var _this = this;
            var event = "user:manage:itemclicked:".concat(Date.now());
            var onItemClicked = function (_a) {
                var id = _a.id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        this.navigateTo({
                            url: '/user/manage/detail',
                            oakId: id,
                        });
                        return [2 /*return*/];
                    });
                });
            };
            this.sub(event, onItemClicked);
            this.navigateTo({
                url: '/user/manage',
                event: event,
            });
        },
    },
});
