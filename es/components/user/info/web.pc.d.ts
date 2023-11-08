import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    visible: boolean;
    nickname: string;
    name: string;
    birth: string;
    gender: string;
    mobile: string;
    avatarUrl: string;
    attr: string;
    showBack: boolean;
    genderOptions: Array<{
        label: string;
        value: string;
    }>;
    wechatUser: EntityDict['wechatUser']['Schema'];
    counter: number;
    isRoot: boolean;
}, {
    goUserManage: () => void;
    goAddMobile: () => void;
    sendCaptcha: () => void;
    goChangePassword: () => void;
    updateMyInfo: () => void;
    unbindingWechat: (captcha?: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
