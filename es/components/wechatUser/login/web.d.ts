import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    error: string;
    loading: boolean;
}, {}>): React.JSX.Element;
