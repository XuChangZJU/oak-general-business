import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    title: string;
    content: string;
    id: string;
    $$createAt$$: number;
    type: string;
    visitState: EntityDict['message']['Schema']['visitState'];
    router: EntityDict['message']['Schema']['router'];
}, {
    goPage: () => void;
}>): JSX.Element;
