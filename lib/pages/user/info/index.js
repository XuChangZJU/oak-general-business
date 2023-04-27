"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
exports.default = OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        birth: 1,
        gender: 1,
        idState: 1,
        userState: 1,
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
                userId: 1,
                user: {
                    id: 1,
                    userState: 1,
                    refId: 1,
                },
            },
        },
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
                extension: 1,
                type: 1,
                entity: 1,
                entityId: 1,
            },
            filter: {
                tag1: 'avatar',
            },
            indexFrom: 0,
            count: 1,
        },
        wechatUser$user: {
            $entity: 'wechatUser',
            data: {
                id: 1,
                openId: 1,
                unionId: 1,
                userId: 1,
                origin: 1,
                user: {
                    id: 1,
                    userState: 1,
                    refId: 1,
                },
            },
        },
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data, features = _a.features;
        var application = features.application.getApplication();
        var avatar = (user === null || user === void 0 ? void 0 : user.extraFile$entity) && (user === null || user === void 0 ? void 0 : user.extraFile$entity[0]);
        var avatarUrl = features.extraFile.getUrl(avatar);
        var mobile = (((user === null || user === void 0 ? void 0 : user.mobile$user) && (user === null || user === void 0 ? void 0 : user.mobile$user[0])) || {}).mobile;
        var genderOption = (user === null || user === void 0 ? void 0 : user.gender) &&
            this.state.genderOptions.find(function (ele) { return ele.value === (user === null || user === void 0 ? void 0 : user.gender); });
        var appType = application === null || application === void 0 ? void 0 : application.type;
        var config = application === null || application === void 0 ? void 0 : application.config;
        var appId;
        var isSupportSyncWeChat = false; //是否支持微信公众号授权登录
        if (appType === 'wechatPublic') {
            var config2 = config;
            var isService = config2 === null || config2 === void 0 ? void 0 : config2.isService; //是否服务号 服务号才能授权登录
            appId = config2 === null || config2 === void 0 ? void 0 : config2.appId;
            isSupportSyncWeChat = !!(isService && appId);
        }
        return {
            id: user === null || user === void 0 ? void 0 : user.id,
            name: user === null || user === void 0 ? void 0 : user.name,
            nickname: user === null || user === void 0 ? void 0 : user.nickname,
            gender: user === null || user === void 0 ? void 0 : user.gender,
            genderStr: genderOption === null || genderOption === void 0 ? void 0 : genderOption.label,
            birthText: (user === null || user === void 0 ? void 0 : user.birth)
                ? (0, dayjs_1.default)(user.birth).format('YYYY-MM-DD')
                : '',
            birth: user === null || user === void 0 ? void 0 : user.birth,
            avatarUrl: avatarUrl,
            mobile: mobile,
            userState: user === null || user === void 0 ? void 0 : user.userState,
            idState: user === null || user === void 0 ? void 0 : user.idState,
            isSupportSyncWeChat: isSupportSyncWeChat,
        };
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: 'danger',
        },
        idStateColor: {
            verifying: 'primary',
            verified: 'success',
            unverified: 'warning',
        },
        genderOptions: [
            {
                value: 'male',
                label: '男',
            },
            {
                value: 'female',
                label: '女',
            },
        ],
        visible: false,
        attr: '',
        attrs: {
            nickname: '昵称',
            gender: '性别',
            birth: '出生日期',
        },
        birthEnd: '',
        refreshing: false,
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var oakId, userId;
                return tslib_1.__generator(this, function (_a) {
                    oakId = this.props.oakId;
                    userId = this.features.token.getUserId();
                    if (userId !== oakId) {
                        throw new types_1.OakUserUnpermittedException();
                    }
                    this.setState({ birthEnd: (0, dayjs_1.default)().format('YYYY-MM-DD') });
                    return [2 /*return*/];
                });
            });
        },
    },
    methods: {
        refreshWechatPublicUserInfo: function () {
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
                            return [4 /*yield*/, this.features.token.refreshWechatPublicUserInfo()];
                        case 2:
                            _a.sent();
                            this.setState({
                                refreshing: false,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.setState({
                                refreshing: false,
                            });
                            throw err_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        goAddMobile: function () {
            this.navigateTo({
                url: '/mobile/me',
            }, {
                showBack: true,
            });
        },
        setVisibleMp: function (e) {
            var dataset = e.target.dataset;
            var attr = dataset.attr;
            this.setVisible(true, attr);
        },
        genderChangeMp: function (e) {
            var detail = e.detail;
            var checked = detail.checked, currentKey = detail.currentKey;
            var attr = this.state.attr;
            this.setCustomData(attr, currentKey);
        },
        birthChangeMp: function (e) {
            var value = e.detail.value;
            var birth = (0, dayjs_1.default)((0, dayjs_1.default)(value).format('YYYY-MM-DD')).valueOf();
            var attr = this.state.attr;
            this.setState({
                birthText2: (0, dayjs_1.default)(value).format('YYYY-MM-DD'),
            });
            this.setCustomData(attr, birth);
        },
        setVisible: function (visible, attr) {
            var _a;
            this.setState((_a = {
                    visible: visible,
                    attr: visible ? attr : ''
                },
                _a["new_".concat(attr)] = '',
                _a.birthText2 = '',
                _a));
        },
        setCustomData: function (attr, value) {
            var _a;
            this.setState((_a = {},
                _a["new_".concat(attr)] = value,
                _a));
        },
        setCustomDataMp: function (e) {
            var detail = e.detail, dataset = e.target.dataset;
            var value = detail.value;
            var attr = this.state.attr;
            this.setCustomData(attr, value);
        },
        updateData: function (attr, value) {
            var _a;
            this.update((_a = {},
                _a[attr] = this.state["new_".concat(attr)],
                _a));
        },
        onConfirmMp: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var attr;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            attr = this.state.attr;
                            return [4 /*yield*/, this.onConfirm(attr)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        onConfirm: function (attr) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var oakId;
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            oakId = this.props.oakId;
                            if (!this.state["new_".concat(attr)]) {
                                this.setMessage({
                                    type: 'warning',
                                    content: "".concat(this.state.attrs[attr], "\u4E0D\u80FD\u4E3A\u7A7A"),
                                });
                                return [2 /*return*/];
                            }
                            this.update((_a = {},
                                _a[attr] = this.state["new_".concat(attr)],
                                _a));
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _b.sent();
                            this.setVisible(false, attr);
                            return [2 /*return*/];
                    }
                });
            });
        },
        onPupopCloseMp: function () {
            var attr = this.state.attr;
            this.clean();
            this.setVisible(false, attr);
        },
        updateMyInfo: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.state.name) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请输入姓名',
                                });
                                return [2 /*return*/];
                            }
                            if (!this.state.nickname) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请输入昵称',
                                });
                                return [2 /*return*/];
                            }
                            // if (!this.state.gender) {
                            //     this.setMessage({
                            //         type: 'error',
                            //         content: '请选择性别',
                            //     });
                            //     return;
                            // }
                            // if (!this.state.birth) {
                            //     this.setMessage({
                            //         type: 'error',
                            //         content: '请选择生日',
                            //     });
                            //     return;
                            // }
                            return [4 /*yield*/, this.execute('update')];
                        case 1:
                            // if (!this.state.gender) {
                            //     this.setMessage({
                            //         type: 'error',
                            //         content: '请选择性别',
                            //     });
                            //     return;
                            // }
                            // if (!this.state.birth) {
                            //     this.setMessage({
                            //         type: 'error',
                            //         content: '请选择生日',
                            //     });
                            //     return;
                            // }
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
