/// <reference types="react" />
import '@wangeditor/editor/dist/css/style.css';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    oakId: string;
    content: string;
    name: string;
}, {}>): JSX.Element;
