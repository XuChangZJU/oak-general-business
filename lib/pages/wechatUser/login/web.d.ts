import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    error: string;
    loading: boolean;
}, {}>): JSX.Element;
