import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { QrCodeType } from '../../../types/Config';
export default function Render(props: WebComponentProps<EntityDict, 'bridge', true, {
    showBack: boolean;
    variant: 'alone' | 'inline' | 'dialog';
    url: string;
    expiresAt: number;
    title?: string;
    qrCodeType: QrCodeType;
}, {}>): import("react/jsx-runtime").JSX.Element;
