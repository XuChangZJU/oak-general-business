"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
const __1 = require("..");
async function getApplication(params, context) {
    const { type } = params;
    const appId = type === 'web' ? __1.DEV_WEB_APPLICATION_ID : __1.DEV_WECHATMP_APPLICATION_ID;
    const { result: [application] } = await context.rowStore.select('application', {
        data: {
            id: 1,
            name: 1,
            config: 1,
            type: 1,
            systemId: 1,
            system: {
                id: 1,
                name: 1,
                config: 1,
            }
        },
        filter: {
            id: appId
        }
    }, context);
    return application.id;
}
exports.getApplication = getApplication;
