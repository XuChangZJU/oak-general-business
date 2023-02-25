import assert from 'assert';
import { WebConfig } from '../../../entities/Application';

export default OakComponent({
    isList: false,
    data: {
        grantByUserEntityGrant: false,
        grantByEmail: false,
        grantByMobile: false,
        grantMethodCount: 0,
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
        redirectToAfterConfirm: Object,
        qrCodeType: String,
    },
    lifetimes: {
        ready() {
            const application = this.features.application.getApplication();
            const { type, config } = application;
            let grantByUserEntityGrant = false,
                grantByMobile = false,
                grantByEmail = false;
            if (type!.startsWith('wechat')) {
                grantByUserEntityGrant = true;
            } else {
                assert(type === 'web');
                const passport = (config as WebConfig).passport || [];
                grantByEmail = passport.includes('email');
                grantByMobile = passport.includes('mobile');
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
