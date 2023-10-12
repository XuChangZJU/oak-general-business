import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'session', true, {
    sessions: any;
    selectedSessionId: string;
    className: string;
    dialog: boolean;
    entityFilter: object;
    entityDisplay: (data: any) => any[];
    entityProjection: object;
}, {
    setSelectedSessionId: (sessionId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
