/// <reference types="react" />
import { EntityDict } from '../../../oak-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "sessionMessage", true, {
    sessionId: string;
    isEntity: boolean;
    isUser: boolean;
    dialog: boolean;
    entity: string;
    entityId: string;
    entityDisplay: (data: any) => any[];
    entityProjection: any;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
