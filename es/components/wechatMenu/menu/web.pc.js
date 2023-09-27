import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Style from './web.module.less';
import { Modal } from 'antd';
import Preview from '../preview';
import ActionPhone from '../actionPhone';
import MenuInfo from '../menuInfo';
export default function Render(props) {
    const { data, methods } = props;
    const { id, oakFullpath, config, wechatInstance, totalConfig, menuType, applicationId, actions, iState } = data;
    const { updateItem, execute } = methods;
    const [open, setOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(0);
    const [selectedSubBtn, setSelectedSubBtn] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [errorIndex, setErrorIndex] = useState([]);
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
    const createMenu = async () => {
        await execute();
    };
    const changeIsPreview = (isPreview) => {
        setIsPreview(isPreview);
    };
    const getOpen = (open) => {
        setOpen(open);
    };
    if (oakFullpath) {
        return (_jsx("div", { className: Style.container, children: _jsxs("div", { className: Style.content, children: [_jsx("div", { className: Style.leftBar, children: _jsx(ActionPhone, { oakAutoUnmount: true, config: config, changeConfig: changeConfig, menuType: menuType, getSelectedBtn: getSelectedBtn, getSelectedSubBtn: getSelectedSubBtn, getCurrentIndex: getCurrentIndex, errorIndex: errorIndex, isPreview: isPreview, open: open }) }), _jsx("div", { className: Style.rightBar, children: _jsx(MenuInfo, { oakAutoUnmount: true, config: config, changeConfig: changeConfig, selectedBtn: selectedBtn, selectedSubBtn: selectedSubBtn, currentIndex: currentIndex, getErrorIndex: getErrorIndex, createMenu: createMenu, changeIsPreview: changeIsPreview, getOpen: getOpen, menuType: menuType, applicationId: applicationId, actions: actions, iState: iState }) }), _jsx(Modal, { title: '\u83DC\u5355\u9884\u89C8', open: isPreview, onCancel: () => setIsPreview(false), footer: null, width: 424, children: _jsx(Preview, { button: config?.button, applicationId: applicationId }) })] }) }));
    }
    return null;
}
