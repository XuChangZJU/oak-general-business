import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'address', true, {
    placement: 'top' | 'bottom' | 'left' | 'right';
    style: Record<string, any>;
}, {
    printDebugStore: () => void;
    printCachedStore: () => void;
    printRunningTree: () => void;
    resetInitialData: () => Promise<void>;
    downloadEnv: () => Promise<void>;
    resetEnv: (data: Record<string, any>) => Promise<void>;
}>): React.JSX.Element;
