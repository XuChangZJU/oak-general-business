import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'antd';
export default function render(props) {
    const { state, oakExecutable, oakExecuting, size, block, type, executeText, buttonProps = {}, } = props.data;
    const { t, onSubmit } = props.methods;
    const disabled = oakExecuting ||
        ['uploading'].includes(state) ||
        (oakExecutable !== true && ['uploaded'].includes(state));
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
    return (_jsx(Button, { type: type, size: size, block: block, disabled: disabled, onClick: onSubmit, ...buttonProps, children: text }));
}
