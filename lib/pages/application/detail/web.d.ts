/// <reference types="react" />
import { WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../general-app-domain/Application/Schema';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
export default function Render(props: WebComponentProps<EntityDict, 'platform', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
    tabValue: 'detail';
}, {
    onTabClick: (key: string) => void;
}>): JSX.Element;
export {};
