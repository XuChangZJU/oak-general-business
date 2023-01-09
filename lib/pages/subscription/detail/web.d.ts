import { WechatPublicConfig } from '../../../general-app-domain/Application/Schema';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WechatPublicConfig;
export default function Render(props: WebComponentProps<EntityDict, 'subscription', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
    entity: string;
    entityId: string;
    tabValue: 'detail';
}, {
    onTabClick: (key: string) => void;
}>): JSX.Element;
export {};
