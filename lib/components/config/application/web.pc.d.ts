import { AppType, WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../oak-app-domain/Application/Schema';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
export default function render(props: WebComponentProps<EntityDict, 'user', false, {
    entity: string;
    name: string;
    currentConfig: Config;
    dirty: boolean;
    type: AppType;
    isService?: boolean;
}, {
    resetConfig: () => void;
    updateConfig: () => void;
    setValue: (path: string, value: string) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}>): JSX.Element;
export {};
