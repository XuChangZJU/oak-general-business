import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { QrCodeType } from '../../../types/Config';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    grantByUserEntityGrant: boolean;
    grantByEmail: boolean;
    grantByMobile: boolean;
    grantMethodCount: number;
    redirectToAfterConfirm: EntityDict['userEntityGrant']['Schema']['redirectTo'];
    claimUrl: string;
    entity: keyof EntityDict;
    entityId: string;
    relations: EntityDict['relation']['OpSchema'][];
    qrCodeType?: QrCodeType;
    rule: EntityDict['userEntityGrant']['OpSchema']['rule'];
    ruleOnRow: EntityDict['userEntityGrant']['OpSchema']['ruleOnRow'];
    passwordRequire: boolean;
}, {}>): JSX.Element;
