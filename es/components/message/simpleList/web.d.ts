import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    messages: EntityDict['message']['Schema'][];
    onClose: () => void;
    open: boolean;
}, {
    goDetailById: (id: string) => void;
    goMessageList: () => void;
}>): React.JSX.Element;
