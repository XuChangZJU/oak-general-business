import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'mobile', true, {
    mobiles?: EntityDict['mobile']['OpSchema'][];
    allowRemove: boolean;
    showBack: boolean;
    tokenMobileId?: string;
}, {
    goAddMobile: () => void;
}>): React.JSX.Element;
