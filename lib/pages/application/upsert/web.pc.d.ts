import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'application', false, {
    name: string;
    description: string;
    variant: 'inline' | 'alone' | 'dialog';
    showBack: boolean;
    type: EntityDict['application']['Schema']['type'];
    typeArr: Array<{
        label: string;
        value: EntityDict['application']['Schema']['type'];
    }>;
    systemId: string;
    oakId: string;
    style: EntityDict['system']['Schema']['style'];
}, {
    confirm: () => void;
}>): JSX.Element;
