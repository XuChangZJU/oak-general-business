/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
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
}, {
    updateMyInfo: () => void;
    goAddMobile: () => void;
    sendCaptcha: () => void;
    unbunding: (captcha?: string) => void;
}>): JSX.Element;
