import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    user: EntityDict['user']['Schema'];
    channels: string[];
    oakId: string;
}, {
    goToMobile: () => void;
}>): React.JSX.Element;
