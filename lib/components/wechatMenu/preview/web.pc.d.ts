import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { WechatPublicInstance } from 'oak-external-sdk';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    button: any[];
    wechatInstance: WechatPublicInstance;
}, {
    getMaterialImgAndVoice: (type: 'image' | 'voice', media_id: string) => Promise<string>;
    getArticle: (article_id: string) => Promise<any[]>;
    getMaterialVideo: (media_id: string) => {
        url: string;
        media_id: string;
    };
}>): import("react/jsx-runtime").JSX.Element;
