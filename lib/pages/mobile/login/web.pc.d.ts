import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    counter: number;
    loginMode?: number;
    loginAgreed?: boolean;
    appId: string;
    onlyCaptcha?: boolean;
    onlyPassword?: boolean;
    loading: boolean;
    backUrl?: string;
    mobile: string;
    captcha: string;
}, {
    setCaptcha: (mobile: string) => void;
    setMobile: (mobile: string) => void;
    sendCaptcha: () => Promise<void>;
    loginByMobile: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
