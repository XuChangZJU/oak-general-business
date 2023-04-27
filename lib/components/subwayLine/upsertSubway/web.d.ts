/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'subway', false, {
    oakId: string;
    name: string;
    onClose: () => void;
    openSubway: boolean;
}, {}>): JSX.Element;
