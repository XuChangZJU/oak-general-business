import { WechatPublicConfig } from '../../../oak-app-domain/Application/Schema';
import { EntityDict } from '../../../oak-app-domain';
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
}>): import("react/jsx-runtime").JSX.Element;
export {};
