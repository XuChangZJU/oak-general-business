import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'userWechatPublicTag', true, {
    showBack: boolean;
    userWechatPublicTags: {
        id: string;
        text: string;
        wechatId: string;
        openId: string;
        syncAt: number;
        iState: 'wait' | 'success' | 'fail';
    }[];
    applicationId: string;
}, {
    sync: (id: string, openId: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
