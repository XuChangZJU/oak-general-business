"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var extraFile_1 = require("../../../../utils/extraFile");
exports.default = OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        birth: 1,
        idState: 1,
        gender: 1,
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
        var _b;
        var user = _a.data;
        var _c = user || {}, id = _c.id, nickname = _c.nickname, idState = _c.idState, userState = _c.userState, name = _c.name, gender = _c.gender, mobile$user = _c.mobile$user, birth = _c.birth, extraFile$entity = _c.extraFile$entity;
        var mobile = mobile$user && ((_b = mobile$user[0]) === null || _b === void 0 ? void 0 : _b.mobile);
        var mobileCount = mobile$user ? mobile$user.length : 0;
        var mobileText = mobileCount && mobileCount > 1 ? "".concat(mobileCount, "\u6761\u624B\u673A\u53F7") : (mobile || '未设置');
        var avatar = extraFile$entity &&
            extraFile$entity[0] &&
            (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
        return {
            id: id,
            nickname: nickname,
            name: name,
            mobile: mobile,
            gender: gender,
            avatar: avatar,
            birth: birth ? (new Date(birth)).toLocaleDateString() : '',
            userState: userState,
            idState: idState,
            mobileCount: mobileCount,
            mobileText: mobileText,
        };
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
            disabled: 'danger',
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
        onActionClick: function (action) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = action;
                            switch (_a) {
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
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.execute(action)];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            {
                                console.error("\u5C1A\u672A\u5B9E\u73B0\u7684action: ".concat(action));
                            }
                            _b.label = 5;
                        case 5:
                            if (action === 'play') {
                                this.navigateBack(2);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
