import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    id: string;
    name: string;
    editor: any;
    title?: string;
    content?: string;
    html?: string;
    origin?: string;
}, {}>): JSX.Element;
