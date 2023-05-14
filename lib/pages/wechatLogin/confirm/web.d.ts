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
}, {
    handleConfirm: () => void;
}>): JSX.Element;
