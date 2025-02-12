import React from 'react';
import { WechatPublicInstance } from 'oak-external-sdk/es/WechatSDK';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'wechatMenu', true, {
    id: string;
    config: any;
    totalConfig: any;
    file: File;
    wechatInstance: WechatPublicInstance;
    errorIndex: number[];
    oakId: string;
    menuType: string;
    applicationId: string;
    actions: string[];
    iState: string;
    tabKey: string;
}, {
    create: () => void;
}>): React.JSX.Element | null;
