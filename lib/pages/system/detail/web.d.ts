/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { Config } from '../../../types/Config';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
    tabValue: 'detail' | 'application_list';
}, {
    onTabClick: (key: string) => void;
}>): JSX.Element;
