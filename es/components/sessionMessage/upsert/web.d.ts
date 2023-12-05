import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { UploadFile } from 'antd/es/upload/interface';
export default function render(props: WebComponentProps<EntityDict, 'sessionMessage', false, {
    isEntity: boolean;
    isUser: boolean;
    $$createAt$$: number;
    text: string;
    type: string;
    aaoe: boolean;
    picUrl: string;
    sessionId: string;
    oakId: string;
    isWeChat: string;
}, {
    setContent: (str: string) => void;
    sendMessage: () => void;
    upload: (file: UploadFile) => void;
}>): React.JSX.Element;
