import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', true, {
    messages: EntityDict['message']['Schema'][];
}, {
    goDetailById: (id: string) => void;
}>): React.JSX.Element;
