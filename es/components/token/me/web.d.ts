import React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'token', true, {
    avatar: string;
    nickname?: string;
    isLoggedIn?: boolean;
    mobile?: string;
    mobileCount?: number;
    refreshing?: boolean;
    isRoot: boolean;
    tokenId?: string;
    mobileText: string;
}, {
    goMyInfo: () => Promise<void>;
    doLogin: () => Promise<void>;
    goMyMobile: () => Promise<void>;
    goUserManage: () => Promise<void>;
}>): React.JSX.Element;
