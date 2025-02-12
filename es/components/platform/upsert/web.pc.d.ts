import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    style: EntityDict['system']['Schema']['style'];
}, {
    confirm: () => void;
}>): React.JSX.Element;
