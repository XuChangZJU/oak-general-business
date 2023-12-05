import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'session', false, {
    newSessionId: string;
}, {}>): React.JSX.Element | null;
