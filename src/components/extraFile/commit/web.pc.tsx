import { WebComponentProps } from 'oak-frontend-base';
import React from 'react';
import { Button, ButtonProps } from 'antd';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';

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
            buttonProps?: ButtonProps;
            afterCommit?: () => void;
            beforeCommit?: () => Promise<boolean> | boolean;
        },
        {
            upload: () => Promise<void>;
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
        executeText,
        buttonProps = {},
        action,
        afterCommit,
        beforeCommit,
    } = props.data;
    const { t, upload, execute } = props.methods;

    const disabled =
        oakExecuting ||
        ['uploading'].includes(state) ||
        (oakExecutable !== true && ['uploaded'].includes(state));
    let text = executeText || t('common:submit');
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
            onClick={async () => {
                if (oakExecutable) {
                    if (beforeCommit) {
                        const beforeCommitResult = await beforeCommit();
                        if (beforeCommitResult === false) {
                            return;
                        }
                    }
                    await execute(action || undefined);
                    await upload();
                    if (afterCommit) {
                        afterCommit();
                    }
                } else {
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