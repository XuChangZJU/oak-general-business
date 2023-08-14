import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'mobile', true, {
    showBack: boolean;
    userId: string;
}, {}>): JSX.Element;
