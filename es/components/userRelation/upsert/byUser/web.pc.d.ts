import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    relations: EntityDict['relation']['OpSchema'][];
    entity: keyof EntityDict;
    entityId: string;
    oakId: string;
}, {
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>): React.JSX.Element;
