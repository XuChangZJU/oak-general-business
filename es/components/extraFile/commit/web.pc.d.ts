import React from 'react';
import { ButtonProps } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile';
export default function render(props: WebComponentProps<EntityDict, any, true, {
    state: FileState;
    size?: ButtonProps['size'];
    block?: ButtonProps['block'];
    type?: ButtonProps['type'];
    executeText?: string;
    action?: string;
    failureIds?: string[];
    buttonProps?: ButtonProps;
}, {
    onSubmit: () => Promise<void>;
}>): React.JSX.Element;
