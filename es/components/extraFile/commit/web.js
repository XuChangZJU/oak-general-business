import React from 'react';
import { Button } from 'antd-mobile';
export default function render(props) {
    const { state, oakExecutable, oakExecuting, oakDirty, size, block, type, executeText, failureIds, buttonProps, } = props.data;
    const { t, onSubmit } = props.methods;
    const disabled = oakExecuting ||
        ['uploading'].includes(state) ||
        oakExecutable !== true && !failureIds;
    let text = executeText || t('common::submit');
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
    return (<Button type={type} size={size} block={block} disabled={disabled} onClick={onSubmit} {...buttonProps}>
            {text}
        </Button>);
}
