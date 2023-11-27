import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'subscription', false, {
    name: string;
    description: string;
    entity: string;
    entityId: string;
    oakId: string;
}, {
    confirm: () => void;
}>): React.JSX.Element;
