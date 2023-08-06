import { EntityDict } from '../../../../general-app-domain';
import { Config } from '../../../../types/Config';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'system', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
}, {}>): import("react/jsx-runtime").JSX.Element;
