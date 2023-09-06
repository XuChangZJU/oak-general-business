import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Button, Dialog } from 'antd-mobile';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
export default function render(props) {
    const { mobiles, allowRemove, tokenMobileId } = props.data;
    const { goAddMobile, removeItem, recoverItem, execute } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [mobiles && mobiles.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(List, { className: Style.list, children: mobiles?.map((ele, index) => (_jsx(List.Item, { prefix: _jsx(MobileOutlined, {}), extra: allowRemove && tokenMobileId !== ele.id && (_jsx("div", { onClick: async () => {
                                    const result = await Dialog.confirm({
                                        content: '确认删除吗？删除后无法用此号码登录',
                                    });
                                    if (result) {
                                        removeItem(ele.id);
                                        try {
                                            await execute();
                                        }
                                        catch (err) {
                                            recoverItem(ele.id);
                                            throw err;
                                        }
                                    }
                                }, children: _jsx(DeleteOutlined, {}) })), children: ele.mobile }, index))) }), _jsx("div", { style: { flex: 1 } })] })) : (_jsx("div", { className: Style.noData, children: _jsx("span", { children: "\u5C1A\u672A\u7ED1\u5B9A\u624B\u673A\u53F7" }) })), _jsx(Button, { block: true, size: "large", color: "primary", onClick: () => goAddMobile(), children: "\u7ED1\u5B9A" })] }));
}
