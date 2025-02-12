import { EntityDict } from '../../../../oak-app-domain';
import { ReactComponentProps } from 'oak-frontend-base';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    entity: keyof ED2;
    entityId: string;
    allowUpdateName?: boolean | undefined;
    allowUpdateNickname?: boolean | undefined;
}>) => React.ReactElement;
export default _default;
