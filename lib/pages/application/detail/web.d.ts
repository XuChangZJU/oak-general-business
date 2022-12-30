/// <reference types="react" />
import { WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../general-app-domain/Application/Schema';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
declare type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
export default function Render(props: WebComponentProps<EntityDict, 'application', false, {
    name: string;
    description: string;
    oakId: string;
    config: Config;
    tabValue: 'detail';
    type: EntityDict['application']['Schema']['type'];
    style: EntityDict['application']['Schema']['style'];
    system: EntityDict['system']['Schema'];
}, {
    onTabClick: (key: string) => void;
}>): JSX.Element;
export {};
