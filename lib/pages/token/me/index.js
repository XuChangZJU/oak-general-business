"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("../../../constants");
var extraFile_1 = require("../../../utils/extraFile");
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
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var tokenId;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, features.token.getTokenValue()];
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
        var _b = tslib_1.__read(_a.data, 1), token = _b[0];
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var user, player, avatarFile, avatar, nickname, mobileData, mobile, mobileCount, isLoggedIn, isPlayingAnother, isRoot;
            var _c, _d;
            return tslib_1.__generator(this, function (_e) {
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
                        tokenId: token === null || token === void 0 ? void 0 : token.id,
                        userId: user === null || user === void 0 ? void 0 : user.id,
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var err_1;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, eventLoggedIn, err_2;
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
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_b) {
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
