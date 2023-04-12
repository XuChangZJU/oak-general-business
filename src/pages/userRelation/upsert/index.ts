import assert from 'assert';
import { WebConfig } from '../../../entities/Application';
import { EntityDict } from '../../../general-app-domain';
import { QrCodeType } from '../../../types/Config';

export default OakComponent({
    isList: false,
    data: {
        grantByUserEntityGrant: false,
        grantByEmail: false,
        grantByMobile: false,
        grantMethodCount: 0,
    },
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
        relations: [] as string[],
        redirectToAfterConfirm:
            {} as EntityDict['userEntityGrant']['Schema']['redirectTo'],
        qrCodeType: '' as QrCodeType,
    },
    lifetimes: {
        ready() {
            const isRoot = this.features.token.isRoot();
            const application = this.features.application.getApplication();
            const { type, config } = application!; // 这个页面总不可能是第一个页面吧，application肯定初始化完成了
            let grantByUserEntityGrant = false,
                grantByMobile = false,
                grantByEmail = false;
            if (type!.startsWith('wechat')) {
                grantByUserEntityGrant = true;
            } else {
                assert(type === 'web');
                const passport = (config as WebConfig).passport || [];
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
