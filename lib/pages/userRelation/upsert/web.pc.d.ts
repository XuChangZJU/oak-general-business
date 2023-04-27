import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { QrCodeType } from '../../../types/Config';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    grantByUserEntityGrant: boolean;
    grantByEmail: boolean;
    grantByMobile: boolean;
    grantMethodCount: number;
    redirectToAfterConfirm: EntityDict['userEntityGrant']['Schema']['redirectTo'];
    entity: keyof EntityDict;
    entityId: string;
    relations: string[];
    qrCodeType?: QrCodeType;
}, {}>): JSX.Element;
