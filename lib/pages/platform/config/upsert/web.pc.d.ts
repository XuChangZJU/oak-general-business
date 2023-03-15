import { Config } from '../../../../types/Config';
import { EntityDict } from '../../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
}, {}>): JSX.Element;
