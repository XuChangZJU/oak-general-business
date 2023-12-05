import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    oakId: string;
    folder: string;
    super: boolean;
}>): React.JSX.Element | null;
