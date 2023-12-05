import React from 'react';
import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    nickname?: string;
    name?: string;
    gender?: string;
    birth?: string;
    idCardType?: string;
    idNumber?: string;
    GenderOptions: Array<{
        value: 'male' | 'female';
        label: string;
    }>;
    IDCardTypeOptions: Array<{
        value: string;
        label: string;
    }>;
}, {
    confirm: () => void;
}>): React.JSX.Element;
