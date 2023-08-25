import { AppType, WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../../oak-app-domain/Application/Schema';
import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
export default function render(props: WebComponentProps<EntityDict, 'application', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
    type: AppType;
}, {}>): import("react/jsx-runtime").JSX.Element;
export {};
