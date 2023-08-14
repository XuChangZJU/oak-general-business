/// <reference types="react" />
import { EntityDict } from '../../../../general-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "user", false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: string[];
    mobile: string;
    isComponent: boolean;
    setPasswordConfirm: (value: boolean) => void;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
