import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    editor: any;
    title?: string;
    author?: string;
    abstract?: string;
    content?: string;
    html?: string;
    origin?: string;
}, {}>): JSX.Element;
