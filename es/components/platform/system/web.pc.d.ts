import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'system', true, {
    systems: EntityDict['system']['OpSchema'][];
    platformId: string;
}>): React.JSX.Element | undefined;
