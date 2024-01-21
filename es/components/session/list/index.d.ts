import { EntityDict } from '../../../oak-app-domain';
import { RowWithActions } from 'oak-frontend-base';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "session", true, {
    entity: string;
    entityFilter: any;
    entityFilterSubStr: string;
    entityDisplay: (data: EntityDict['session']['Schema'][] | RowWithActions<EntityDict, 'session'>[]) => any[];
    entityProjection: any;
    sessionId: string;
    dialog: boolean;
    onItemClick: ((sessionId: string) => {}) | null | undefined;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
