import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'parasite', true, {
    searchValue: string;
    list: RowWithActions<EntityDict, 'userEntityGrant'>[];
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
    qrCodeUrl: string;
    qrCodeExpiresAt: number;
}, {
    cancel: () => void;
    getQrCode: () => Promise<void>;
}>): JSX.Element;
