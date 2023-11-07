import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, } from 'antd';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { title, content, router } = data;
    const { t, goPage } = methods;
    const pathname = router?.pathname;
    return (_jsx(_Fragment, { children: _jsx("div", { className: Style.warp, children: _jsxs("div", { className: Style.inner, children: [_jsx("h1", { className: Style.title, children: title }), _jsx("div", { className: Style.content, children: content }), pathname && (_jsx(Button, { className: Style.btn, block: true, type: "primary", onClick: () => {
                            goPage();
                        }, children: "\u524D\u5F80" }))] }) }) }));
}
