"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relationId: 1,
        type: 1,
        number: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
        qrCodeType: 1,
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data;
        return ({
            userEntityGrant: userEntityGrant,
        });
    },
    properties: {
        entity: '',
        entityId: '',
        relations: [],
        type: 'grant',
        redirectToAfterConfirm: {},
        qrCodeType: '',
    },
    data: {
        period: 5,
        userEntityGrantId: '',
        unit: 'minute',
        maxes: {
            minute: 4320,
            hour: 72,
            day: 3,
        },
    },
    lifetimes: {
        ready: function () {
            this.setInit();
        },
    },
    methods: {
        onShareAppMessage: function (e) {
            var _a;
            var app = this.features.application.getApplication();
            var _b = app, config = _b.config, system = _b.system;
            var systemConfig = system.config;
            var userEntityGrantId = this.state.userEntityGrantId;
            var imageUrl = (systemConfig && ((_a = systemConfig === null || systemConfig === void 0 ? void 0 : systemConfig.App) === null || _a === void 0 ? void 0 : _a.mpShareImageUrl)) || '';
            return {
                title: '',
                path: "/pages/userEntityGrant/confirm/index?oakId=".concat(userEntityGrantId),
                imageUrl: imageUrl,
            };
        },
        setInit: function () {
            var userId = this.features.token.getUserId();
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, type = _a.type, redirectToAfterConfirm = _a.redirectToAfterConfirm, qrCodeType = _a.qrCodeType;
            this.update({
                confirmed: 0,
                entity: entity,
                entityId: entityId,
                type: type || 'grant',
                number: 1,
                granterId: userId,
                redirectTo: redirectToAfterConfirm,
                qrCodeType: qrCodeType,
            });
            this.setState({
                userEntityGrantId: '',
            });
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                wx.hideShareMenu();
            }
        },
        setRelation: function (value) {
            this.update({
                relationId: value,
            });
        },
        setRelationMp: function (e) {
            var currentKey = e.detail.currentKey;
            this.setRelation(currentKey);
        },
        setNumber: function (value) {
            this.update({
                number: value,
            });
        },
        setNumberMp: function (e) {
            var currentKey = e.detail.currentKey;
            this.setNumber(parseInt(currentKey, 10));
        },
        setPeriod: function (p) {
            this.setState({ period: p });
        },
        setPeriodMp: function (e) {
            var count = e.detail.count;
            this.setPeriod(count);
        },
        setUnit: function (u) {
            this.setState({ unit: u });
        },
        onBack: function () {
            this.navigateBack();
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, period, unit, userEntityGrant, time, expiresAt, id;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.state, period = _a.period, unit = _a.unit, userEntityGrant = _a.userEntityGrant;
                            if (!(userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relationId)) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请选择角色权限',
                                });
                                return [2 /*return*/];
                            }
                            time = 0;
                            switch (unit) {
                                case 'hour': {
                                    time = period * 60 * 60 * 1000;
                                    break;
                                }
                                case 'day': {
                                    time = period * 24 * 60 * 60 * 1000;
                                    break;
                                }
                                default: {
                                    if (unit === 'minute') {
                                        time = period * 60 * 1000;
                                    }
                                    else {
                                        this.setMessage({
                                            type: 'error',
                                            content: '请选择过期时长单位',
                                        });
                                        return [2 /*return*/];
                                    }
                                    break;
                                }
                            }
                            expiresAt = Date.now() + time;
                            this.update({
                                expiresAt: expiresAt,
                            });
                            (0, assert_1.default)(!this.props.oakId);
                            id = this.getId();
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _b.sent();
                            // set了这个值就在页面显示二维码
                            this.setState({
                                userEntityGrantId: id,
                            });
                            // 小程序显示可分享菜单
                            if (process.env.OAK_PLATFORM === 'wechatMp') {
                                wx.showShareMenu({});
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
