import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    loading: boolean;
    illegal: boolean;
    expired: boolean;
}, {}>): React.JSX.Element;
