import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'system', false, {
    text: string;
    variant: 'inline' | 'alone' | 'dialog';
    showBack: boolean;
}, {
    confirm: () => void;
}>): JSX.Element;
