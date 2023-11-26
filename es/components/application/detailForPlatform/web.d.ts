import React from 'react';
import { WebConfig, WechatPublicConfig, WechatMpConfig } from '../../../oak-app-domain/Application/Schema';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
type Config = WebConfig | WechatPublicConfig | WechatMpConfig;
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
    goWechatPublicTagList: () => void;
}>): React.JSX.Element;
export {};
