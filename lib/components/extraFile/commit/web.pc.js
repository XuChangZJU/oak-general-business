"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function render(props) {
    const { state, oakExecutable, oakExecuting, afterCommit, size, block, type, executeText, buttonProps = {} } = props.data;
    const { t, upload, execute } = props.methods;
    const disabled = oakExecuting || ['uploading'].includes(state) || (oakExecutable !== true && ['uploaded'].includes(state));
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
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: type, size: size, block: block, disabled: disabled, onClick: async () => {
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
        }, ...buttonProps, children: text }));
}
exports.default = render;
