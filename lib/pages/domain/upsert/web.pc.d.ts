/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'domain', false, {
    id: string;
    systemId: string;
    url: string;
    apiPath: string;
    port: number;
    protocol: EntityDict['domain']['Schema']['protocol'];
    variant: 'inline' | 'alone' | 'dialog';
    showBack: boolean;
}, {
    confirm: () => void;
}>): JSX.Element;
