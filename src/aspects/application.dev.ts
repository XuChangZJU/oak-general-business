import { EntityDict } from "general-app-domain";
import { AppType } from "general-app-domain/Application/Schema";
import {
    DEV_WEB_APPLICATION_ID,
    DEV_WECHATMP_APPLICATION_ID,
    DEV_WECHATPUPLIC_APPLICATION_ID,
} from '..';
import { GeneralRuntimeContext } from "../RuntimeContext";

export async function getApplication<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    type: AppType;
}, context: Cxt) {
    const { type } = params;
    const APP_ID = {
        web: DEV_WEB_APPLICATION_ID,
        wechatMp: DEV_WECHATMP_APPLICATION_ID,
        wechatPublic: DEV_WECHATPUPLIC_APPLICATION_ID,
    };
    const appId = APP_ID[type];

    const { result: [application]} = await context.rowStore.select('application', {
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

    return application.id as string;
}