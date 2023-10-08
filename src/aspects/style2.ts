import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { Style } from '../types/Style';

export async function updateStyle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: 'platform' | 'system',
    entityId: string,
    style: Style
}, context: Cxt) {
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