import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './web.module.less';
import { List, Button } from 'antd';
export default function Render(props) {
    const { methods, data } = props;
    const { addresses } = data;
    if (addresses && addresses.length > 0) {
        return (_jsx(_Fragment, { children: _jsx(List, { children: addresses.map((address) => (_jsx(List.Item, { onClick: () => methods.gotoUpsert(address.id), children: _jsx(List.Item.Meta, { title: address.name, description: address.areaText + address.detail }) }, address.id))) }) }));
    }
    return (_jsxs("div", { className: Style.container, children: [methods.t('common::noData'), _jsx(Button, { block: false, ghost: false, loading: false, type: "primary", style: { marginTop: 10 }, onClick: () => methods.goNewAddress(), children: methods.t('common::action.create') })] }));
}
