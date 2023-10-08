import { generateNewId } from 'oak-domain/lib/utils/uuid';
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
        }
    }, {});
}
