import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'session', false, {
    sessions: any;
    selectedSessionId: string;
    className: string;
    dialog: boolean;
    entityFilter: object;
    entityDisplay: (data: any) => any[];
    entityProjection: object;
}, {
    setSelectedSessionId: (conversationId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
