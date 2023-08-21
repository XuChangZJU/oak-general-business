/// <reference types="react" />
import { EntityDict } from '../../../../oak-app-domain';
import { QrCodeType } from '../../../../types/Config';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "userEntityGrant", false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: import("../../../../oak-app-domain/Relation/Schema").OpSchema[];
    type: "grant" | "transfer";
    redirectToAfterConfirm: import("../../../../oak-app-domain/UserEntityGrant/Schema").RedirectToProps | null | undefined;
    qrCodeType: QrCodeType;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
