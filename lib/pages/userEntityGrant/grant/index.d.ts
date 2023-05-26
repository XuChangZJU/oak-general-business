/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "userEntityGrant", false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: import("../../../general-app-domain/Relation/Schema").OpSchema[];
    type: string;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
