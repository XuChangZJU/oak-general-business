"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { data, methods } = props;
    const { $$createAt$$, text, type, picUrl, isEntity, aaoe, sessionId, isWeChat, } = data;
    const { t, setContent, sendMessage, upload } = methods;
    const textareaRef = (0, react_1.useRef)(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.toolbar, children: (0, jsx_runtime_1.jsx)(antd_1.Upload, { accept: 'image/*', multiple: false, showUploadList: false, customRequest: () => { }, onChange: ({ file }) => {
                        upload(file);
                    }, children: (0, jsx_runtime_1.jsx)(icons_1.PictureOutlined, { className: web_module_less_1.default.icon }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.textareaBox, children: [(0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { ref: textareaRef, className: web_module_less_1.default.textarea, maxLength: 500, placeholder: t('placeholder'), rows: 5, onChange: (e) => {
                            setContent(e.target.value);
                        }, onFocus: () => { }, onKeyDown: handleKeyDown, value: text }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.btn, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", disabled: !text, onClick: () => {
                                sendMessage();
                            }, children: t('send') }) })] })] }));
}
exports.default = render;
