/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'wechatLogin', true, {
    type: EntityDict['wechatLogin']['Schema']['type'];
    expired: boolean;
    expiresAt: boolean;
    user?: {
        name: string;
        nickname: string;
    };
    successed: number;
    userId: string;
    loginUserId: string;
    appId: string;
}, {
    getCodeAndRedirect: () => void;
}>): JSX.Element;
