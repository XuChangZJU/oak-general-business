/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    oakLoading: boolean;
    oakExecuting: boolean;
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
}>): JSX.Element;
