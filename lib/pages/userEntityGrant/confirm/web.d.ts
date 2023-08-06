import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    type: 'grant';
    expired: boolean;
    relation: boolean;
    expiresAt: boolean;
    granter?: {
        name: string;
        nickname: string;
    };
    entity: string;
    hasConfirmed: boolean;
    granteeId: string;
    number: number;
    confirmed: number;
    userId: string;
    redirectTo: EntityDict['userEntityGrant']['Schema']['redirectTo'];
    redirectCounter: number;
}, {
    handleConfirm: () => void;
    redirectPage: () => void;
}>): import("react/jsx-runtime").JSX.Element;
