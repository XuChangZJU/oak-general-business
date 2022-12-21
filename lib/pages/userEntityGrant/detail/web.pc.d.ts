import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    showBack: boolean;
    variant: 'alone' | 'inline' | 'dialog';
    url: string;
    expiresAt: number;
}, {}>): JSX.Element;
