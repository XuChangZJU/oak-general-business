import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import React from 'react';
export default function Render(props: WebComponentProps<EntityDict, 'messageTypeTemplate', false, {
    systemId: string;
    originList: string[];
}, {}>): React.JSX.Element;
