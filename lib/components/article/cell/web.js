"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var method = props.methods, data = props.data;
    var _a = props.data, content = _a.content, oakId = _a.oakId, width = _a.width;
    var t = method.t;
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
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: content && ((0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: content ? content : value, mode: "default", style: {
                        width: width === 'xs' ? '100vw' : '900px',
                    } })) })) }) })));
}
exports.default = Render;
