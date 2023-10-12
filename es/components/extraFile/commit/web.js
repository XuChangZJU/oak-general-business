import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'antd-mobile';
export default function render(props) {
    const { state, oakExecutable, oakExecuting, oakDirty, size, block, type, executeText, buttonProps, beforeCommit, afterCommit, } = props.data;
    const { t, upload, execute } = props.methods;
    const disabled = oakExecuting ||
        ['uploading'].includes(state) ||
        (oakExecutable === false && ['uploaded'].includes(state));
    let text = executeText || t('common:submit');
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
    return (_jsx(Button, { type: type, size: size, block: block, disabled: disabled, onClick: async () => {
            if (oakExecutable) {
                if (beforeCommit) {
                    const beforeCommitResult = await beforeCommit();
                    if (beforeCommitResult === false) {
                        return;
                    }
                }
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
        }, ...buttonProps, children: text }));
}
