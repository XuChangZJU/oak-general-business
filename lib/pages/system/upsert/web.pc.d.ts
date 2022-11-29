/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'system', false, {
    name: string;
    description: string;
    super: boolean;
    variant: 'inline' | 'alone' | 'dialog';
    showBack: boolean;
}, {
    confirm: () => void;
}>): JSX.Element;
