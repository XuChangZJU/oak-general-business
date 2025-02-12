import React from 'react';
import { Config } from '../../../types/Config';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    name: string;
    currentConfig: Config;
    dirty: boolean;
}, {
    resetConfig: () => void;
    updateConfig: () => void;
    setValue: (path: string, value: string) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}>): React.JSX.Element;
