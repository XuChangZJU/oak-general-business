/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'domain', false, {
    oakId: string;
    systemId: string;
    url: string;
    apiPath: string;
    port: string;
    protocol: EntityDict['domain']['Schema']['protocol'];
    tabValue: 'detail';
}, {
    onTabClick: (key: string) => void;
}>): JSX.Element;
