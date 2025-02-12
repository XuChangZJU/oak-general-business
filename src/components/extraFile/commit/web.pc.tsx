import React from 'react';
import { Button, ButtonProps } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile';

export default function render(
    props: WebComponentProps<
        EntityDict,
        any,
        true,
        {
            state: FileState;
            size?: ButtonProps['size'];
            block?: ButtonProps['block'];
            type?: ButtonProps['type'];
            executeText?: string;
            action?: string;
            failureIds?: string[];
            buttonProps?: ButtonProps;
        },
        {
            onSubmit: () => Promise<void>;
        }
    >
) {
    const {
        state,
        oakExecutable,
        oakExecuting,
        size,
        block,
        type,
        failureIds,
        executeText,
        buttonProps = {},
    } = props.data;
    const { t, onSubmit } = props.methods;

    const disabled = oakExecuting ||
        ['uploading'].includes(state) ||
        oakExecutable !== true && !failureIds;
    let text = executeText || t('common::submit');
    if (oakExecuting) {
        text = t('executing', { text });
    } else if (oakExecutable === false) {
        if (state === 'uploading') {
            text = t('uploading');
        } else if (['failed', 'local'].includes(state)) {
            text = t('upload');
        }
    }

    return (
        <Button
            type={type}
            size={size}
            block={block}
            disabled={disabled}
            onClick={onSubmit}
            {...buttonProps}
        >
            {text}
        </Button>
    );
}