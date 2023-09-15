"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const editor_for_react_1 = require("@wangeditor/editor-for-react");
const react_1 = require("react");
function Render(props) {
    const { id, name, editor, title, content } = props.data;
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    const [value, setValue] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (content) {
            setValue(content);
        }
    }, [content]);
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.content, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.editorContainer, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.titleContainer, children: (0, jsx_runtime_1.jsx)("span", { className: web_module_less_1.default.title, children: title }) }), (0, jsx_runtime_1.jsx)("div", { id: "article-content", style: { width: '100%' }, children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: value, mode: "default", style: {
                                width: '100%',
                            } }) })] }) }) }));
}
exports.default = Render;
