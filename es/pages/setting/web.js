import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Button } from 'antd-mobile';
import Style from './mobile.module.less';
const LIST_BTN = [
    {
        id: 1,
        label: '个人信息保护政策',
    },
    {
        id: 2,
        label: '隐私摘要政策',
    },
    {
        id: 3,
        label: '个人信息手机清单',
    },
    {
        id: 4,
        label: '应用权限说明',
    },
    {
        id: 5,
        label: '个人信息共享清单',
    },
    // {
    //     id: 6,
    //     label: '注销账号',
    // },
];
export default function render(props) {
    const { data, methods } = props;
    const { userId } = data;
    const { logout, setVisible } = methods;
    return (_jsxs("div", { className: Style.container, children: [_jsx(List, { className: Style.list, children: LIST_BTN.map((ele) => {
                    return (_jsx(List.Item, { arrow: true, onClick: () => {
                            setVisible();
                        }, children: ele.label }));
                }) }), _jsx("div", { style: { flex: 1 } }), userId && (_jsx("div", { className: Style.logoutBox, children: _jsx(Button, { block: true, 
                    // color="danger"
                    style: {
                        '--background-color': 'var(--oak-color-primary)',
                        '--text-color': 'var(--oak-bg-color-container)',
                    }, onClick: () => {
                        logout();
                    }, children: "\u9000\u51FA\u767B\u5F55" }) }))] }));
}
