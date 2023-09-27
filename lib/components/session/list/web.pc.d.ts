import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'session', false, {
    sessions: EntityDict['session']['Schema'][];
    selectedSessionId: string;
    className: string;
    dialog: boolean;
    entityFilter: object;
}, {
    setSelectedSessionId: (conversationId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
