import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Alert, Affix, Space, Typography } from 'antd';
import Style from './web.module.less';
import Web from './web/index';
import WechatMp from './wechatMp/index';
import WechatPublic from './wechatPublic/index';
function AppView(props) {
    const { type, config, setValue, removeItem, cleanKey, isService } = props;
    if (type === 'web') {
        return (_jsx(Web, { config: config || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }));
    }
    if (type === 'wechatMp') {
        return (_jsx(WechatMp, { config: config || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }));
    }
    if (type === 'wechatPublic') {
        return (_jsx(WechatPublic, { isService: isService, config: config || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }));
    }
    return null;
}
export default function render(props) {
    const { entity, name, type, currentConfig, dirty, isService, } = props.data;
    const { resetConfig, updateConfig, setValue, removeItem, cleanKey } = props.methods;
    return (_jsxs(_Fragment, { children: [_jsx(Affix, { offsetTop: 64, children: _jsx(Alert, { message: _jsx("div", { children: _jsxs("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", _jsx(Typography.Text, { keyboard: true, className: Style.weight, children: entity }), "\u5BF9\u8C61", _jsx(Typography.Text, { keyboard: true, className: Style.weight, children: name }), "\u7684\u914D\u7F6E\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: _jsxs(Space, { children: [_jsx(Button, { disabled: !dirty, type: "primary", danger: true, onClick: () => resetConfig(), style: {
                                    marginRight: 10,
                                }, children: "\u91CD\u7F6E" }), _jsx(Button, { disabled: !dirty, type: "primary", onClick: () => updateConfig(), children: "\u786E\u5B9A" })] }) }) }), _jsx("div", { className: Style.container, children: _jsx(AppView, { isService: isService, type: type, config: currentConfig || {}, setValue: (path, value) => setValue(path, value), removeItem: (path, index) => removeItem(path, index), cleanKey: (path, key) => cleanKey(path, key) }) })] }));
}
