/// <reference types="react" />
import { EntityDict } from "../../../../../oak-app-domain";
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "userRelation", true, {
    entity: keyof EntityDict;
    entityId: string;
    relations: import("../../../../../oak-app-domain/Relation/Schema").OpSchema[];
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
