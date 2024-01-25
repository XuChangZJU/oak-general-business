import { EntityDict } from '../../../oak-app-domain';
import { QrCodeType } from '../../../types/Config';
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, "userEntityGrant", false, {
    entity: string;
    entityId: string;
    relationEntity: string;
    relationEntityFilter: any;
    relationIds: string[];
    type: "grant" | "transfer";
    redirectToAfterConfirm: import("../../../oak-app-domain/UserEntityGrant/Schema").RedirectToProps | null | undefined;
    claimUrl: string;
    qrCodeType: QrCodeType;
    multiple: boolean;
    rule: "single" | "all" | "free";
    ruleOnRow: "single" | "all" | "free";
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
