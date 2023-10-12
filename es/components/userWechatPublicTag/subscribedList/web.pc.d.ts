import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatUser', true, {
    wechatUsers: {
        nickname: string;
        avatar: string;
        openId: string;
        sync: boolean;
        syncAt: number;
        subscribedAt: number;
        tags: {
            id: string;
            text: string;
            wechatId: number;
        }[];
    }[];
    tags: {
        label: string;
        value: string;
    }[];
    applicationId: string;
}, {
    getTags: () => void;
    tagging: (tagIdList: number[], openId: string) => void;
    syncToLocale: (openId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
