import { generateNewId } from 'oak-domain/lib/utils/uuid';
export async function updateConfig(params, context) {
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
export async function updateApplicationConfig(params, context) {
    const { entity, entityId, config } = params;
    await context.operate(entity, {
        id: generateNewId(),
        action: 'update',
        data: {
            config,
        },
        filter: {
            id: entityId,
        },
    }, {});
}
export async function updateStyle(params, context) {
    const { entity, entityId, style } = params;
    await context.operate(entity, {
        id: generateNewId(),
        action: 'update',
        data: {
            style,
        },
        filter: {
            id: entityId,
        },
    }, {});
}
