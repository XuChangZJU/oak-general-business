import React from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { WechatPublicInstance } from 'oak-external-sdk/es/WechatSDK';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    button: any[];
    wechatInstance: WechatPublicInstance;
}, {
    getMaterialImgAndVoice: (type: 'image' | 'voice', media_id: string) => Promise<string>;
    getArticle: (article_id: string) => Promise<any[]>;
    getMaterialVideo: (mediaId: string) => {
        url: string;
        media_id: string;
    };
}>): React.JSX.Element;
