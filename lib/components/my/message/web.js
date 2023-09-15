"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const icons_1 = require("@ant-design/icons");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { count, className, onClick, style } = data;
    const { goMessageList } = methods;
    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Badge, { content: count || '', children: (0, jsx_runtime_1.jsx)(icons_1.BellOutlined, { className: (0, classnames_1.default)(mobile_module_less_1.default.icon, className), style: style, onClick: (e) => {
                if (typeof onClick === 'function') {
                    onClick(e);
                    return;
                }
                goMessageList();
            } }) }));
}
exports.default = Render;
