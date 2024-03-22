import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'address', false, {
    name?: string;
    phone?: string;
    districtName?: string;
    areaText?: string;
    detail?: string;
}, {
    callAreaPicker: () => void;
    confirm: () => Promise<void>;
}>): React.JSX.Element;
