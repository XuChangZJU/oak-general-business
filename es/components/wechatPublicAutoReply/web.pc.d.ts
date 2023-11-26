import React from 'react';
import { EntityDict } from '../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import "@wangeditor/editor/dist/css/style.css";
import { ReplyType } from '../../types/WeChat';
export default function Render(props: WebComponentProps<EntityDict, 'wechatPublicAutoReply', true, {
    id: string;
    content: {
        text?: string;
        mediaId?: string;
        title?: string;
        description?: string;
    };
    type: string;
    applicationId: string;
}, {
    save: () => void;
    changeType: (type: ReplyType) => void;
    getMaterialImgAndVoice: (type: string, mediaId: string) => Promise<string>;
    getMaterialVideo: (mediaId: string) => Promise<{
        title: string;
        description: string;
        mediaId: string;
        url: string;
    }>;
}>): React.JSX.Element;
