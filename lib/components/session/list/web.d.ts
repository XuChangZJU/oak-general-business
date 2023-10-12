import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'session', true, {
    sessions: EntityDict['session']['Schema'][];
    selectedSessionId: string;
    entityFilter: object;
}, {
    setSelectedSessionId: (sessionId: string) => void;
    navigateToMessage: (sessionId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
