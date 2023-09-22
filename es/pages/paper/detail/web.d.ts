import { EntityDict } from './../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'article', false, {
    title?: string;
    author?: string;
    abstract?: string;
    content?: string;
    html?: string;
}, {}>): import("react/jsx-runtime").JSX.Element;
