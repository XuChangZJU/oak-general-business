import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
type Session = EntityDict['session']['Schema'];
export default function Render(props: WebComponentProps<EntityDict, 'session', true, {
    sessions: Partial<Session & {
        name: string;
    }>[];
    selectedSessionId: string;
    entityFilter: object;
}, {
    setSelectedSessionId: (sessionId: string) => void;
    navigateToMessage: (sessionId: string) => void;
}>): React.JSX.Element;
export {};
