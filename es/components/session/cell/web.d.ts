import React from "react";
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'session', false, {
    id: string;
    unreadLength: number;
    sessionMessages: EntityDict['sessionMessage']['Schema'][];
    userType: string;
    selectedId: string;
    onSelect: (id: string) => void;
    name: string;
    lmts: number;
}, {
    getName: () => string;
    getAvatarUrl: () => string;
}>): React.JSX.Element;
