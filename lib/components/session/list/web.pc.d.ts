import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
type Session = EntityDict['session']['Schema'];
export default function Render(props: WebComponentProps<EntityDict, 'session', true, {
    sessions: Partial<Session & {
        name: string;
    }>[];
    selectedSessionId: string;
    className: string;
    dialog: boolean;
    entityFilter: object;
    entityDisplay: (data: EntityDict['session']['Schema'][] | RowWithActions<EntityDict, 'session'>[]) => any[];
    entityProjection: object;
}, {
    setSelectedSessionId: (sessionId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
