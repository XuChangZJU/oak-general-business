import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    entity: keyof ED2;
    entityId: string;
    redirectToAfterConfirm: ED2["userEntityGrant"]["Schema"]["redirectTo"];
    qrCodeType: string;
}>) => React.ReactElement;
export default _default;
