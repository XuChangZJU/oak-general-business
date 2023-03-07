import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', true, {
    pagination?: {
        pageSize: number;
        total: number;
        currentPage: number;
    };
    messages: EntityDict['message']['Schema'][];
}, {
    goDetailById: (id: string) => void;
}>): JSX.Element;
