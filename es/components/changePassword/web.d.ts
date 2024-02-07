import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    channels: string[];
    oakId: string;
    loading: boolean;
}, {
    goToMobile: () => void;
}>): React.JSX.Element | null;
