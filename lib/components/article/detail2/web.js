"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
var editor_for_react_1 = require("@wangeditor/editor-for-react");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
function Render(props) {
    var methods = props.methods, data = props.data;
    var _a = props.data, content = _a.content, name = _a.name, oakId = _a.oakId;
    var t = methods.t;
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
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.rightContainer }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { display: 'flex', justifyContent: 'flex-end' } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsxs)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                            var url = "".concat(window.location.host, "/article/detail?oakId=").concat(oakId);
                            (0, copy_to_clipboard_1.default)(url);
                            methods.setMessage({
                                content: '复制链接成功',
                                type: 'success',
                            });
                        } }, { children: [(0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), "\u590D\u5236\u94FE\u63A5"] })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 16 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 20 } }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(editor_for_react_1.Editor, { defaultConfig: editorConfig, value: value, mode: "default", style: {
                                            width: 750,
                                        } }) }) }) }) })) })) })] })));
}
exports.default = Render;
