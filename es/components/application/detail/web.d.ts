import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'application', false, {
    name: string;
    description: string;
    id: string;
    tabValue: 'detail';
    type: EntityDict['application']['Schema']['type'];
}>): React.JSX.Element | undefined;
