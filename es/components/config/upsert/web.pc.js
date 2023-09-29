import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tabs, Button, Alert, Affix, Space, Typography } from 'antd';
import Style from './web.module.less';
import Account from './account/index';
import Cos from './cos/index';
import Map from './map/index';
import Live from './live/index';
import Sms from './sms/index';
export default function Render(props) {
    const { entity, name, currentConfig, dirty } = props.data;
    const { resetConfig, updateConfig, setValue, removeItem, cleanKey, t } = props.methods;
    const { Account: account, Cos: cos, Map: map, Live: live, Sms: sms, } = currentConfig || {};
    return (_jsxs(_Fragment, { children: [_jsx(Affix, { offsetTop: 64, children: _jsx(Alert, { message: _jsx("div", { children: _jsxs("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", _jsx(Typography.Text, { keyboard: true, className: Style.weight, children: entity }), "\u5BF9\u8C61", _jsx(Typography.Text, { keyboard: true, className: Style.weight, children: name }), "\u7684\u914D\u7F6E\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: _jsxs(Space, { children: [_jsx(Button, { disabled: !dirty, type: "primary", danger: true, onClick: () => resetConfig(), style: {
                                    marginRight: 10,
                                }, children: t('common::reset') }), _jsx(Button, { disabled: !dirty, type: "primary", onClick: () => updateConfig(), children: t('common::action.confirm') })] }) }) }), _jsx("div", { className: Style.container, children: _jsx(Tabs, { tabPosition: "left", items: [
                        {
                            key: '云平台帐号',
                            label: '云平台帐号',
                            children: (_jsx(Account, { account: account || {}, setValue: (path, value) => setValue(`Account.${path}`, value), removeItem: (path, index) => removeItem(`Account.${path}`, index) })),
                        },
                        {
                            key: '云存储设置',
                            label: '云存储设置',
                            children: (_jsx(Cos, { cos: cos || {}, setValue: (path, value) => setValue(`Cos.${path}`, value), removeItem: (path, index) => removeItem(`Cos.${path}`, index) })),
                        },
                        {
                            key: '直播api设置',
                            label: '直播api设置',
                            children: (_jsx(Live, { live: live || {}, setValue: (path, value) => setValue(`Map.${path}`, value) })),
                        },
                        {
                            key: '地图api设置',
                            label: '地图api设置',
                            children: (_jsx(Map, { map: map || {}, setValue: (path, value) => setValue(`Map.${path}`, value) })),
                        },
                        {
                            key: '短信设置',
                            label: '短信设置',
                            children: (_jsx(Sms, { sms: sms || {}, setValue: (path, value) => setValue(`Sms.${path}`, value), removeItem: (path, index) => removeItem(`Sms.${path}`, index), cleanKey: (path, key) => cleanKey(`Sms.${path}`, key) })),
                        },
                    ] }) })] }));
}
