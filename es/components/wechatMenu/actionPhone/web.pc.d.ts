import React from 'react';
import { WechatPublicInstance } from 'oak-external-sdk/es/WechatSDK';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    config: any;
    menuIndex: number;
    file: File;
    wechatInstance: WechatPublicInstance;
    errorIndex: number[];
    menuType: string;
    changeConfig: (config: any) => void;
    getSelectedBtn: (selectedBtn: number) => void;
    getSelectedSubBtn: (selectedSubBtn: number) => void;
    getCurrentIndex: (currentIndex: number) => void;
    isPreview: boolean;
    open: boolean;
    tabKey: string;
}, {
    setConfig: (index: number, content: any, currentIndex?: number) => void;
    deleteMenuItem: (index: number) => void;
    deleteSubMenuItem: (index: number, currentIndex: number) => void;
    toRight: (index: number) => void;
    toLeft: (index: number) => void;
    toUp: (currentIndex: number, index: number) => void;
    toDown: (currentIndex: number, index: number) => void;
}>): React.JSX.Element;
