import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'subscription', false, {
    name: string;
    description: string;
    variant: 'inline' | 'alone' | 'dialog';
    showBack: boolean;
    entity: string;
    entityId: string;
    oakId: string;
}, {
    confirm: () => void;
}>): JSX.Element;
