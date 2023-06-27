import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'token', false, {
    counter: number;
    loginMode?: number;
    loginAgreed?: boolean;
    appId: string;
    onlyCaptcha: boolean;
    onlyPassword: boolean;
    loading: boolean;
}, {
    sendCaptcha: (mobile: string) => Promise<void>;
    loginByMobileWeb: (mobile: string, loginAgreed: boolean, password?: string, captcha?: string, loginMode?: number) => Promise<void>;
    goPage: (destination: string) => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
