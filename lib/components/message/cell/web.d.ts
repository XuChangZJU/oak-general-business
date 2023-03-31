import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    onItemClicked: (item: {
        id: string;
        router: EntityDict['message']['Schema']['router'];
    }) => void;
    $$createAt$$: number;
    type: string;
    title: string;
    router: EntityDict['message']['Schema']['router'];
    visitState: EntityDict['message']['Schema']['visitState'];
    id: string;
}, {}>): JSX.Element;
