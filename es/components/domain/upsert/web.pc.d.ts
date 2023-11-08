import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'domain', false, {
    id: string;
    systemId: string;
    url: string;
    apiPath: string;
    port: number;
    protocol: EntityDict['domain']['Schema']['protocol'];
}, {
    confirm: () => void;
}>): import("react/jsx-runtime").JSX.Element;
