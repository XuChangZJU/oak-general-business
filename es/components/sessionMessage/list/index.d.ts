/// <reference types="react" />
import { EntityDict } from '../../../oak-app-domain';
import { RowWithActions } from 'oak-frontend-base';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "sessionMessage", true, {
    sessionId: string;
    isEntity: boolean;
    dialog: boolean;
    entity: string;
    entityId: string;
    entityDisplay: (data: EntityDict['session']['Schema'][] | RowWithActions<EntityDict, 'session'>[]) => any[];
    entityProjection: any;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
