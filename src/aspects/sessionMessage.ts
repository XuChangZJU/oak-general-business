import { EntityDict } from "../oak-app-domain";
import { AppType, WechatPublicConfig } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { OakUserException } from 'oak-domain/lib/types';
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import assert from "assert";

export async function createSessionMessage<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        data?: WechatPublicEventData | WechatMpEventData;
        type: AppType,
        entity?: string,
        entityId?: string,
    },
    context: Cxt
) {
    const { data, type, entity, entityId } = params;
    // const [application] = await context.select('application', {
    //     data: {
    //         id: 1,
    //         systemId: 1,
    //         type: 1,
    //     },
    //     filter: {
    //         systemId,
    //         type: 'web'
    //     }
    // }, {});


}
