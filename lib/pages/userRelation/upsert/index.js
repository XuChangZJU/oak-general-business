"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    isList: true,
    entity: 'relation',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        name: 1,
        display: 1,
    },
    data: {
        grantByUserEntityGrant: false,
        grantByEmail: false,
        grantByMobile: false,
        grantMethodCount: 0,
    },
    filters: [
        {
            filter: function () {
                var _a = this.props, entity = _a.entity, entityId = _a.entityId;
                return {
                    entity: entity,
                    $or: [
                        {
                            entityId: entityId,
                        },
                        {
                            entityId: {
                                $exists: false,
                            },
                        }
                    ]
                };
            }
        }
    ],
    formData: function (_a) {
        var data = _a.data;
        return {
            relations: data,
        };
    },
    properties: {
        entity: '',
        entityId: '',
        redirectToAfterConfirm: {},
        qrCodeType: '',
    },
    lifetimes: {
        ready: function () {
            var isRoot = this.features.token.isRoot();
            var application = this.features.application.getApplication();
            var _a = application, type = _a.type, config = _a.config; // 这个页面总不可能是第一个页面吧，application肯定初始化完成了
            var grantByUserEntityGrant = false, grantByMobile = false, grantByEmail = false;
            if (type.startsWith('wechat')) {
                grantByUserEntityGrant = true;
            }
            else {
                (0, assert_1.default)(type === 'web');
                var passport = config.passport || [];
                grantByEmail = passport.includes('email');
                // 是超级管理员 不需要根据配置手机号来判断 by wkj
                grantByMobile = isRoot || passport.includes('mobile');
                grantByUserEntityGrant = passport.includes('wechat');
            }
            var grantMethodCount = 0;
            if (grantByEmail) {
                grantMethodCount++;
            }
            if (grantByMobile) {
                grantMethodCount++;
            }
            if (grantByUserEntityGrant) {
                grantMethodCount++;
            }
            this.setState({
                grantMethodCount: grantMethodCount,
                grantByUserEntityGrant: grantByUserEntityGrant,
                grantByEmail: grantByEmail,
                grantByMobile: grantByMobile,
            });
        },
    },
});
