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
    password: string;
}, {
    sendCaptcha: (mobile: string) => Promise<void>;
    loginByMobile: (mobile: string, password?: string, captcha?: string) => Promise<void>;
}>): null;
