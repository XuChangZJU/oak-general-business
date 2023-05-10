/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { QrCodeType } from '../../../types/Config';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "relation", true, {
    entity: keyof EntityDict;
    entityId: string;
    redirectToAfterConfirm: import("../../../general-app-domain/UserEntityGrant/Schema").RedirectToProps | null | undefined;
    qrCodeType: QrCodeType;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
