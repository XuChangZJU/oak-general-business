"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
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
            birth: 1,
            gender: 1,
            idState: 1,
            userState: 1,
            isRoot: 1,
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
                    entityId: 1,
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
            isRoot: 1,
        },
    },
    filters: [
        {
            filter: function () {
                var tokenId = this.features.token.getTokenValue();
                if (tokenId) {
                    return {
                        id: tokenId,
                    };
                }
                return {
                    id: 'none',
                };
            },
        },
    ],
    formData: function (_a) {
        var _b;
        var data = _a.data, features = _a.features;
        var _c = tslib_1.__read(data || [], 1), token = _c[0];
        var user = token === null || token === void 0 ? void 0 : token.user;
        var player = token === null || token === void 0 ? void 0 : token.player;
        var avatarFile = (user === null || user === void 0 ? void 0 : user.extraFile$entity) && (user === null || user === void 0 ? void 0 : user.extraFile$entity[0]);
        var avatar = features.extraFile.getUrl(avatarFile);
        var nickname = user && user.nickname;
        var mobileData = user && user.mobile$user && user.mobile$user[0];
        var mobile = (mobileData || {}).mobile;
        var mobileCount = ((_b = user === null || user === void 0 ? void 0 : user.mobile$user) === null || _b === void 0 ? void 0 : _b.length) || 0;
        var isLoggedIn = !!token;
        var isPlayingAnother = token && token.userId !== token.playerId;
        var isRoot = !!(player === null || player === void 0 ? void 0 : player.isRoot);
        var mobileText = mobileCount && mobileCount > 1
            ? "".concat(mobileCount, "\u6761\u624B\u673A\u53F7")
            : mobile || '未绑定';
        return {
            tokenId: token === null || token === void 0 ? void 0 : token.id,
            userId: user === null || user === void 0 ? void 0 : user.id,
            avatar: avatar,
            nickname: nickname,
            mobile: mobile,
            mobileCount: mobileCount,
            mobileText: mobileText,
            isLoggedIn: isLoggedIn,
            isPlayingAnother: isPlayingAnother,
            isRoot: isRoot,
        };
    },
    data: {
        refreshing: false,
    },
    methods: {
        doLogin: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, eventLoggedIn, err_1;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
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
                                this.subEvent(eventLoggedIn, function () {
                                    _this.navigateBack();
                                });
                                this.navigateTo({
                                    url: '/login',
                                    eventLoggedIn: eventLoggedIn,
                                }, undefined, true);
                                return [3 /*break*/, 5];
                            }
                            _b.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            err_1 = _b.sent();
                            console.error(err_1);
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
            this.navigateTo({
                url: '/user/manage',
            });
        },
        goSetting: function () {
            this.navigateTo({
                url: '/setting',
            });
        },
        goMyInfo: function () {
            if (!this.state.isLoggedIn) {
                return;
            }
            this.navigateTo({
                url: '/user/info',
                oakId: this.state.userId,
            });
        },
    },
});
