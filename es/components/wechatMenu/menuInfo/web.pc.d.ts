import React from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    id: string;
    config: any;
    menuIndex: number;
    file: File;
    errorIndex: number[];
    oakId: string;
    menuType: string;
    selectedBtn: number;
    selectedSubBtn: number;
    currentIndex: number;
    getNewSelectedBtn: (selectedBtn: number) => void;
    getNewSelectedSubBtn: (selectedSubBtn: number) => void;
    getNewCurrentIndex: (currentIndex: number) => void;
    changeIsPreview: (isPreview: boolean) => void;
    getOpen: (open: boolean) => void;
    applicationId: string;
    menuId: number;
    actions: string[];
    wechatId: string;
    iState: string;
}, {
    setConfig: (index: number, content: any, currentIndex?: number) => void;
    confirmName: (menuName: string) => string;
    confirmSubName: (menuName: string) => string;
    toRight: (index: number) => void;
    toLeft: (index: number) => void;
    toUp: (currentIndex: number, index: number) => void;
    toDown: (currentIndex: number, index: number) => void;
    editMenuName: (index: number, name: string, currentIndex?: number) => void;
    deleteMenuContent: (index: number, currentIndex?: number) => void;
    getMaterialImgAndVoice: (type: string, mediaId: string) => Promise<string>;
    getMaterialVideo: (mediaId: string) => void;
    decideMenuContentLabel: (obj: any, type: 'news' | 'image' | 'video' | 'voice' | 'text') => string;
    getArticle: (article_id: string) => void;
    createMenu: (errorInfo: string, errorUrlInfo: string) => void;
    deleteConditionalMenu: () => void;
    confirmUrl: (url: string) => string;
    getImg: (url: string) => string;
}>): React.JSX.Element;
