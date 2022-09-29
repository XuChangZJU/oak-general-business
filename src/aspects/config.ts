import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { Config } from '../types/Config';

export async function updateConfig<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(params: {
    entity: 'platform' | 'system',
    entityId: string,
    config: Config,
}, context: Cxt) {
    const { rowStore } = context;
    const { entity, entityId, config } = params;
    await rowStore.operate(entity, {
        id: await generateNewId(),
        action: 'update',
        data: {
            config,
        },
        filter: {
            id: entityId,
        }
    }, context, {});
}