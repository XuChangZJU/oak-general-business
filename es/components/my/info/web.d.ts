import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    nameText?: string;
    mobileText?: string;
    userId?: string;
    gender: string;
    nickname?: string;
    name?: string;
    idState?: string;
    userState?: string;
    showLogout?: boolean;
}, {
    logout: () => void;
    updateAttribute: (attr: string, value: any) => Promise<void>;
}>): React.JSX.Element;
