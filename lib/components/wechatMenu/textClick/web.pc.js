"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
const editor_for_react_1 = require("@wangeditor/editor-for-react");
const toolbarConfig = {
    excludeKeys: [
        "blockquote",
        "fullScreen",
        "headerSelect",
        "|",
        "bold",
        "group-more-style",
        "bgColor",
        "bulletedList",
        "numberedList",
        "todo",
        "group-image",
        "group-video",
        "insertTable",
        "codeBlock",
    ],
}; // TS 语法
function Render(props) {
    const { value, editor, getDecidedMenuContent } = props.data;
    const { setEditor, setHtml } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(editor_for_react_1.Toolbar, { editor: editor, defaultConfig: toolbarConfig, mode: "default", style: {
                    borderBottom: '1px solid #ccc',
                } }), (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: {
                    placeholder: '请输入内容...',
                }, value: value, onCreated: setEditor, onChange: (editorDom) => {
                    const html = editorDom.getHtml();
                    if (html && html !== '<p><br></p>') {
                        getDecidedMenuContent(html);
                    }
                }, mode: "default", style: {
                    minHeight: 200,
                    maxHeight: 400,
                    overflowY: 'auto',
                } })] }));
}
exports.default = Render;
