"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var react_1 = require("react");
function Render(props) {
    var _a = props.data, id = _a.id, name = _a.name, editor = _a.editor, title = _a.title, content = _a.content;
    console.log(title, content);
    var editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), value = _b[0], setValue = _b[1];
    (0, react_1.useEffect)(function () {
        if (content) {
            setValue(content);
        }
    }, [content]);
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.editorContainer }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.titleContainer }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.title }, { children: name })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ id: "article-content", style: { width: "100%" } }, { children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: value, mode: "default", style: {
                                width: '100%'
                            } }) }))] })) })) })));
}
exports.default = Render;
