import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { Config } from '../types/Config';

export async function updateConfig<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: 'platform' | 'system',
    entityId: string,
    config: Config,
}, context: Cxt) {
    const { entity, entityId, config } = params;
    await context.operate(entity, {
        id: generateNewId(),
        action: 'update',
        data: {
            config,
        },
        filter: {
            id: entityId,
        }
    }, {});
}


export async function updateApplicationConfig<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        entity: 'application';
        entityId: string;
        config: EntityDict['application']['Schema']['config'];
    },
    context: Cxt
) {
    const { entity, entityId, config } = params;
    await context.operate(
        entity,
        {
            id: generateNewId(),
            action: 'update',
            data: {
                config,
            },
            filter: {
                id: entityId,
            },
        },
        {}
    );
}