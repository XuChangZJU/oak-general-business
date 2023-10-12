"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const antd_1 = require("antd");
const preview_1 = tslib_1.__importDefault(require("../preview"));
const actionPhone_1 = tslib_1.__importDefault(require("../actionPhone"));
const menuInfo_1 = tslib_1.__importDefault(require("../menuInfo"));
function Render(props) {
    const { data, methods } = props;
    const { id, oakFullpath, config, wechatInstance, totalConfig, menuType, applicationId, actions, iState, tabKey } = data;
    const { updateItem, execute, create, } = methods;
    const [open, setOpen] = (0, react_1.useState)(false);
    const [isPreview, setIsPreview] = (0, react_1.useState)(false);
    const [selectedBtn, setSelectedBtn] = (0, react_1.useState)(0);
    const [selectedSubBtn, setSelectedSubBtn] = (0, react_1.useState)(0);
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(1);
    const [errorIndex, setErrorIndex] = (0, react_1.useState)([]);
    const changeConfig = (config) => {
        updateItem({
            menuConfig: config,
        }, id);
    };
    const getSelectedBtn = (selectedBtn) => {
        setSelectedBtn(selectedBtn);
    };
    const getSelectedSubBtn = (selectedSubBtn) => {
        setSelectedSubBtn(selectedSubBtn);
    };
    const getCurrentIndex = (currentIndex) => {
        setCurrentIndex(currentIndex);
    };
    const getErrorIndex = (errorIndex) => {
        setErrorIndex(errorIndex);
    };
    const createMenu = () => {
        create();
    };
    const changeIsPreview = (isPreview) => {
        setIsPreview(isPreview);
    };
    const getOpen = (open) => {
        setOpen(open);
    };
    if (oakFullpath) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.content, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.leftBar, children: (0, jsx_runtime_1.jsx)(actionPhone_1.default, { oakAutoUnmount: true, config: config, changeConfig: changeConfig, menuType: menuType, getSelectedBtn: getSelectedBtn, getSelectedSubBtn: getSelectedSubBtn, getCurrentIndex: getCurrentIndex, errorIndex: errorIndex, isPreview: isPreview, open: open, tabKey: tabKey }) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.rightBar, children: (0, jsx_runtime_1.jsx)(menuInfo_1.default, { oakAutoUnmount: true, config: config, changeConfig: changeConfig, selectedBtn: selectedBtn, selectedSubBtn: selectedSubBtn, currentIndex: currentIndex, getErrorIndex: getErrorIndex, createMenu: createMenu, changeIsPreview: changeIsPreview, getOpen: getOpen, menuType: menuType, applicationId: applicationId, actions: actions, iState: iState }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: '\u83DC\u5355\u9884\u89C8', open: isPreview, onCancel: () => setIsPreview(false), footer: null, width: 424, children: (0, jsx_runtime_1.jsx)(preview_1.default, { button: config?.button, applicationId: applicationId }) })] }) }));
    }
    return null;
}
exports.default = Render;
