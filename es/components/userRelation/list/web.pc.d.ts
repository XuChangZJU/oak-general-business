import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    users: EntityDict['user']['Schema'][];
    searchValue?: string;
    entity: string;
    entityId: string;
    showBack: boolean;
    showTitle: boolean;
}, {
    goUpsert: () => void;
    goUpdate: (id: string) => void;
    confirmDelete: (id: string) => Promise<void>;
}>): React.JSX.Element;
