import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'wechatQrCode', false, {
    url: string;
    expiresAt: number;
}, {}>): React.JSX.Element | null;
