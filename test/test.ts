import { EntityDict } from 'oak-app-domain';
import { SelectRowShape } from 'oak-domain/lib/types/Entity';

function select<T extends keyof EntityDict, P extends EntityDict[T]['Selection']['data']>(entity: T, proj: P): SelectRowShape<EntityDict[T]['Schema'], P> {
    throw new Error('method not implemented');
}

const r = select('address', {
    id: 1,
    name: 1,
    detail: 1,
    area: {
        id: 1,
        name: 1,
    },
    $expr10: {
        $abs: 10,
    },
});

r.area.name

