import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    user: EntityDict['user']['Schema'];
    failTimes: number;
}, {
    onConfirm: (prevPassword: string, password: string) => Promise<void>;
}>): React.JSX.Element;
