import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    counter: number;
    loginMode?: number;
    appId: string;
    onlyCaptcha?: boolean;
    onlyPassword?: boolean;
    loading: boolean;
    width: string;
    isSupportWechat: boolean;
    isSupportWechatPublic: boolean;
    isSupportGrant: boolean;
    domain?: string;
    disabled?: string;
    redirectUri: string;
    url: string;
}, {
    sendCaptcha: (mobile: string) => Promise<void>;
    loginByMobile: (mobile: string, password?: string, captcha?: string) => Promise<void>;
    setLoginMode: (value: number) => void;
}>): import("react/jsx-runtime").JSX.Element;
