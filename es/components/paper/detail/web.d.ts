import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'article', false, {
    title?: string;
    author?: string;
    abstract?: string;
    content?: string;
    html?: string;
}, {}>): React.JSX.Element;
