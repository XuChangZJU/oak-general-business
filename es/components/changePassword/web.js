import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Alert } from 'antd';
import ByMobile from './byMobile';
import ByPassword from './byPassword';
export default function Render(props) {
    const { data, methods } = props;
    const { channels, user, oakFullpath, oakId } = data;
    const { goToMobile } = methods;
    const items = [
        {
            key: 'password',
            label: '原密码验证',
            children: _jsx(ByPassword, { oakId: oakId, oakPath: oakFullpath }),
        },
        {
            key: 'mobile',
            label: '手机号验证',
            children: _jsx(ByMobile, { oakId: oakId, oakPath: oakFullpath }),
        },
    ];
    if (channels.length === 0) {
        return (_jsx(Alert, { message: _jsxs(_Fragment, { children: ["\u8BF7\u60A8\u5148", _jsx("div", { style: {
                            color: 'blue',
                            display: 'inline',
                            textDecoration: 'underline',
                        }, onClick: () => goToMobile(), children: "\u70B9\u6B64\u7ED1\u5B9A\u624B\u673A\u53F7" }), "\u518D\u8FDB\u884C\u5BC6\u7801\u4FEE\u6539"] }), type: "info" }));
    }
    return _jsx(Tabs, { items: items.filter((ele) => channels.includes(ele.key)) });
}
