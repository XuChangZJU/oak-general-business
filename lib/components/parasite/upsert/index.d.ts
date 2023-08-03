/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "parasite", false, {
    entity: keyof EntityDict;
    entityId: string;
    relation: string;
    redirectTo: {
        pathname: string;
        props?: Record<string, any> | undefined;
        state?: Record<string, any> | undefined;
    } | undefined;
    multiple: boolean;
    nameLabel: string;
    nameRequired: boolean;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
