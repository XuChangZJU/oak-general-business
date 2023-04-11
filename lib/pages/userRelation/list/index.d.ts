/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "user", true, {
    entity: keyof EntityDict;
    entityId: string;
    relations: string[];
    redirectToAfterConfirm: import("../../../general-app-domain/UserEntityGrant/Schema").RedirectToProps | null | undefined;
    qrCodeType: string;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
