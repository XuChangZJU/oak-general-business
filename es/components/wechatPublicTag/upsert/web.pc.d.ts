import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatPublicTag', false, {
    text: string;
    tagName: string;
    wechatId: number;
    sync: boolean;
    open: boolean;
    changeOpen: (open: boolean) => void;
    editTag: () => void;
    addTag: () => void;
    changeText: (text: string) => void;
    isUpdate: boolean;
}, {}>): React.JSX.Element;
