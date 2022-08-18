"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var extraFile_1 = require("../../../../utils/extraFile");
exports.default = OakPage({
    path: 'user:manage:detail',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        idState: 1,
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
    isList: false,
    formData: function (_a) {
        var user = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _b, id, nickname, idState, userState, name, mobile$user, extraFile$entity, mobile, avatar;
            var _c;
            return tslib_1.__generator(this, function (_d) {
                _b = user || {}, id = _b.id, nickname = _b.nickname, idState = _b.idState, userState = _b.userState, name = _b.name, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                mobile = mobile$user && ((_c = mobile$user[0]) === null || _c === void 0 ? void 0 : _c.mobile);
                avatar = extraFile$entity &&
                    extraFile$entity[0] &&
                    (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                return [2 /*return*/, {
                        id: id,
                        nickname: nickname,
                        name: name,
                        mobile: mobile,
                        avatar: avatar,
                        userState: userState,
                        idState: idState,
                    }];
            });
        });
    },
    actions: [
        'accept',
        'activate',
        'disable',
        'enable',
        'remove',
        'update',
        'verify',
        'play',
    ],
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: ''
        },
        idStateColor: {
            verifying: 'primary',
            verified: 'success',
            unverified: 'warning'
        },
        show: false,
        actionDescriptions: {
            accept: {
                icon: {
                    name: 'pan_tool',
                },
                label: '通过',
            },
            activate: {
                icon: {
                    name: 'check',
                },
                label: '激活',
            },
            disable: {
                icon: {
                    name: 'flash_off',
                },
                label: '禁用',
            },
            enable: {
                icon: {
                    name: 'flash_on',
                },
                label: '启用',
            },
            remove: {
                icon: {
                    name: 'clear',
                },
                label: '删除',
            },
            update: {
                icon: {
                    name: 'edit',
                },
                label: '更新',
            },
            verify: {
                icon: {
                    name: 'how_to_reg',
                },
                label: '验证',
            },
            play: {
                icon: {
                    name: 'play_circle',
                },
                label: '切换',
            },
        },
    },
    methods: {
        openDrawer: function () {
            this.setState({
                show: true,
            });
        },
        closeDrawer: function () {
            this.setState({
                show: false,
            });
        },
        onActionClick: function (_a) {
            var detail = _a.detail;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var action, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            action = detail.action;
                            _b = action;
                            switch (_b) {
                                case 'update': return [3 /*break*/, 1];
                                case 'enable': return [3 /*break*/, 2];
                                case 'disable': return [3 /*break*/, 2];
                                case 'accept': return [3 /*break*/, 2];
                                case 'verify': return [3 /*break*/, 2];
                                case 'activate': return [3 /*break*/, 2];
                                case 'play': return [3 /*break*/, 2];
                            }
                            return [3 /*break*/, 4];
                        case 1:
                            {
                                this.navigateTo({
                                    url: '/user/manage/upsert',
                                    oakId: this.props.oakId,
                                });
                                return [2 /*return*/];
                            }
                            _c.label = 2;
                        case 2: return [4 /*yield*/, this.execute(action)];
                        case 3:
                            _c.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            {
                                console.error("\u5C1A\u672A\u5B9E\u73B0\u7684action: ".concat(action));
                            }
                            _c.label = 5;
                        case 5:
                            if (action === 'play') {
                                this.navigateBack({
                                    delta: 2,
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
