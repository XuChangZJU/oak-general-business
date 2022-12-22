/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'address', true, {
    placement: 'top' | 'bottom' | 'left' | 'right';
    style: Record<string, any>;
}, {
    printDebugStore: () => void;
    printCachedStore: () => void;
    printRunningTree: () => void;
    resetInitialData: () => void;
    downloadEnv: () => void;
    resetEnv: (data: Record<string, any>) => void;
}>): JSX.Element;
