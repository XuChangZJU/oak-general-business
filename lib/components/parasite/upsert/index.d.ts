import { EntityDict } from '../../../general-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, false, {
    entity: keyof ED2;
    entityId: string;
    relation: string;
    redirectTo: EntityDict['parasite']['Schema']['redirectTo'];
    multiple: boolean;
    nameLabel: string;
    nameRequired: boolean;
}>) => React.ReactElement;
export default _default;
