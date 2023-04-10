/// <reference types="react" />
import { WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../general-app-domain/Application/Schema';
import { EntityDict } from '../../../general-app-domain/EntityDict';
declare type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
declare const _default: (props: import("oak-frontend-base").ReactComponentProps<EntityDict, keyof EntityDict, false, {
    config: Config;
    entity: keyof EntityDict;
    name: string;
    entityId: string;
    type: string;
    isService: BooleanConstructor;
}>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export default _default;
