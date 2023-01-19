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
    isExists: boolean;
    granteeId: string;
    number: number;
    confirmed: number;
    userId: string;
}, {
    handleConfirm: () => void;
}>): JSX.Element;
