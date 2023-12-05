import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
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
    setCaptcha: (mobile: string) => void;
    setMobile: (mobile: string) => void;
    sendCaptcha: () => Promise<void>;
    loginByMobile: () => Promise<void>;
}>): React.JSX.Element;
