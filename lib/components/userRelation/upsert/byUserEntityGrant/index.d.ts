import { EntityDict } from '../../../../oak-app-domain';
import { QrCodeType } from '../../../../types/Config';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    entity: keyof ED2;
    entityId: string;
    redirectToAfterConfirm: ED2["userEntityGrant"]["Schema"]["redirectTo"];
    qrCodeType: QrCodeType;
    type: EntityDict['userEntityGrant']['Schema']['type'];
    relations: EntityDict['relation']['OpSchema'][];
}>) => React.ReactElement;
export default _default;
