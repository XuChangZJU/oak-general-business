import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'subway', false, {
    oakId: string;
    name: string;
    onClose: () => void;
    openSubway: boolean;
}, {}>): React.JSX.Element;
