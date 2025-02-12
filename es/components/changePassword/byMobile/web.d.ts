import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'message', false, {
    user: EntityDict['user']['Schema'];
    captcha: string;
    counter: number;
    mobile: string;
}, {
    setCaptcha: (value: string) => void;
    setMobile: (value: string) => void;
    sendCaptcha: (mobile: string) => Promise<void>;
    onConfirmByMobile: (mobile: string, captcha: string, newPassword: string) => Promise<void>;
}>): React.JSX.Element;
