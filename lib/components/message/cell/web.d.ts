import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    onItemClicked: (item: {
        id: string;
        params: EntityDict['message']['Schema']['params'];
    }) => void;
    $$createAt$$: number;
    type: string;
    title: string;
    params: EntityDict['message']['Schema']['params'];
    visitState: EntityDict['message']['Schema']['visitState'];
    id: string;
}, {}>): JSX.Element;
