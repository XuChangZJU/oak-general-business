import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    entityId: string;
    entity: keyof ED2;
}>) => React.ReactElement;
export default _default;
