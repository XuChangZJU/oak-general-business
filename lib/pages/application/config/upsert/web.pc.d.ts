import { AppType, WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../../general-app-domain/Application/Schema';
import { EntityDict } from '../../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
export default function render(props: WebComponentProps<EntityDict, 'application', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
    type: AppType;
}, {}>): JSX.Element;
export {};
