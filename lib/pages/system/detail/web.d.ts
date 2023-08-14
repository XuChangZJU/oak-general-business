import { EntityDict } from '../../../oak-app-domain';
import { Config } from '../../../types/Config';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    oakId: string;
    folder: string;
    config: Config;
    tabValue: 'detail' | 'application_list' | 'domain_list';
    super: boolean;
    platform: {
        name: string;
    };
}, {
    onTabClick: (key: string) => void;
}>): JSX.Element;
