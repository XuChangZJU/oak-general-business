/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    style: EntityDict['system']['Schema']['style'];
}, {
    confirm: () => void;
}>): JSX.Element;
