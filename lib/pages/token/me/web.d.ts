import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'token', true, {
    avatar?: string;
    nickname?: string;
    isLoggedIn?: boolean;
    mobile?: string;
    mobileCount?: number;
    refreshing?: boolean;
    isRoot: boolean;
    tokenId?: string;
}, {
    doLogin: () => Promise<void>;
    goMyMobile: () => Promise<void>;
    goUserManage: () => Promise<void>;
}>): JSX.Element;
