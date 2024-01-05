import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'mobile', false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: EntityDict['relation']['OpSchema'][];
    mobileValue: string;
    mobileValueReady: boolean;
    userId: string;
    passwordRequire: boolean;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>): React.JSX.Element;
