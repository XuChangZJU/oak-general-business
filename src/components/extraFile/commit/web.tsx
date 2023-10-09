import { WebComponentProps } from 'oak-frontend-base';
import React from 'react';
import { Button, ButtonProps } from 'antd-mobile';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';

export default function render(props: WebComponentProps<EntityDict, any, true, {
    state: FileState;
    size?: ButtonProps['size'];
    block?: ButtonProps['block'];
    type?: ButtonProps['type'];
    executeText?: string;
    buttonProps?: ButtonProps;
}, {
    upload: () => Promise<void>;
    afterCommit?: () => void;
}>) {
    const { state, oakExecutable, oakExecuting, oakDirty,
        size, block, type, executeText, buttonProps } = props.data;
    const { t, upload, execute, afterCommit } = props.methods;
    
    const disabled = oakExecuting || ['uploading'].includes(state) || (oakExecutable === false && ['uploaded'].includes(state));
    let text = executeText || t('common::action.confirm');
    if (oakExecuting) {
        text = t('executing', { text });
    }
    else if (oakExecutable === false) {
        if (state === 'uploading') {
            text = t('uploading');
        }
        else if (['failed', 'local'].includes(state)) {
            text = t('upload');
        }
    }

    return (
        <Button
            type={type}
            size={size}
            block={block}
            disabled={disabled}
            onClick={async () => {
                if (oakExecutable) {
                    await execute();
                    await upload();
                    if (afterCommit) {
                        afterCommit();
                    }
                }
                else {
                    await upload();
                    if (afterCommit) {
                        afterCommit();
                    }
                }
            }}
            {...buttonProps}
        >
            {text}            
        </Button>
    );    
}