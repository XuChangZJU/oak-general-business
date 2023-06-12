/// <reference types="react" />
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatUser', false, {
    wechatLoginId: string;
    qrCodeUrl: string;
    loading: boolean;
}, {}>): JSX.Element;
