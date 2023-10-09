"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
// import { UserOutlined } from '@ant-design/icons';
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const useFeatures_1 = tslib_1.__importDefault(require("../../../hooks/useFeatures"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const web_1 = require("oak-frontend-base/es/platforms/web");
function render(props) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name, showBack } = data;
    const { getName } = methods;
    const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
    const features = (0, useFeatures_1.default)();
    const width = (0, web_1.useWidth)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(web_module_less_1.default.header, {
            [web_module_less_1.default.header_mobile]: width === 'xs'
        }), children: [showBack && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", onClick: () => {
                    features.navigator.navigateBack();
                }, children: (0, jsx_runtime_1.jsx)(icons_1.LeftOutlined, { className: web_module_less_1.default.backIcon }) })), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.middle, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.name, children: getName() }) })] }));
}
exports.default = render;
