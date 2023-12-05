import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    onItemClicked: (item: {
        id: string;
        router: EntityDict['message']['Schema']['router'];
    }) => void;
    $$createAt$$: number;
    type: string;
    title: string;
    router: EntityDict['message']['Schema']['router'];
    visitState: EntityDict['message']['Schema']['visitState'];
    id: string;
    visit: (id: string) => void;
}, {}>): React.JSX.Element;
