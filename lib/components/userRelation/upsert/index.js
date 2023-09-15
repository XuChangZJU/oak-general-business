"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
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
            filter() {
                const { entity, entityId } = this.props;
                const isRoot = this.features.token.isRoot();
                const filter = {
                    entity: entity,
                    $or: [
                        {
                            entityId,
                        },
                        {
                            entityId: {
                                $exists: false,
                            },
                        },
                    ],
                };
                if (!isRoot) {
                    const userId = this.features.token.getUserId();
                    filter.relationAuth$destRelation = {
                        sourceRelation: {
                            userRelation$relation: {
                                userId,
                            },
                        },
                    };
                }
                return filter;
            },
        },
    ],
    formData({ data }) {
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
        ready() {
            const isRoot = this.features.token.isRoot();
            const application = this.features.application.getApplication();
            const { type, config } = application; // 这个页面总不可能是第一个页面吧，application肯定初始化完成了
            let grantByUserEntityGrant = false, grantByMobile = false, grantByEmail = false;
            if (type.startsWith('wechat')) {
                grantByUserEntityGrant = true;
            }
            else {
                (0, assert_1.assert)(type === 'web');
                const passport = config.passport || [];
                grantByEmail = passport.includes('email');
                // 是超级管理员 不需要根据配置手机号来判断 by wkj
                grantByMobile = isRoot || passport.includes('mobile');
                grantByUserEntityGrant = passport.includes('wechat');
            }
            let grantMethodCount = 0;
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
                grantMethodCount,
                grantByUserEntityGrant,
                grantByEmail,
                grantByMobile,
            });
        },
    },
});
