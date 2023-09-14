import { WechatPublicConfig } from '../../../../oak-app-domain/Application/Schema';
import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WechatPublicConfig;
export default function render(props: WebComponentProps<EntityDict, 'application', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
}, {}>): JSX.Element;
export {};
