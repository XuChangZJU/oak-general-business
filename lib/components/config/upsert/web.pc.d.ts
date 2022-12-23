import { Config } from '../../../types/Config';
import { EntityDict } from '../../../general-app-domain';
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
}>): JSX.Element;
