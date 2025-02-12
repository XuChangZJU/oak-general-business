import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { Config } from '../types/Config';
import { Style } from '../types/Style';

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

export async function updateStyle<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        entity: 'platform' | 'system';
        entityId: string;
        style: Style;
    },
    context: Cxt
) {
    const { entity, entityId, style } = params;
    await context.operate(
        entity,
        {
            id: generateNewId(),
            action: 'update',
            data: {
                style,
            },
            filter: {
                id: entityId,
            },
        },
        {}
    );
}