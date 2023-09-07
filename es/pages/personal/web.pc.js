import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import MyInfo from '../../components/my/info';
import Styles from './web.pc.module.less';
export default function Render() {
    return (_jsx(Layout, { children: _jsxs(Layout, { children: [_jsx(Sider, { children: _jsx(MyInfo, {}) }), _jsx(Content, { className: Styles.content, children: "\u6839\u636E\u4E1A\u52A1\u5B9A\u5236\uFF08\u8BF7\u5C06\u8FD9\u4E2A\u9875\u9762\u7684\u903B\u8F91\u590D\u5236\u5230project\u4E0B\u5904\u7406\uFF09" })] }) }));
}
