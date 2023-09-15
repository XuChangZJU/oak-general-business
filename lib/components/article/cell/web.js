"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { confirm } = antd_1.Modal;
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
const editor_for_react_1 = require("@wangeditor/editor-for-react");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { methods: method, data } = props;
    const { content, oakId, width } = props.data;
    const { t } = method;
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
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 16, children: content && ((0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: content ? content : value, mode: "default", style: {
                        width: width === 'xs' ? '100vw' : '900px',
                    } })) }) }) }));
}
exports.default = Render;
