import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Style from './index.module.less';
import { ClearOutlined } from '@ant-design/icons';
function MessageNumber(props) {
    const { number = 0, clear } = props;
    return (_jsxs("div", { className: Style.messageNumberBox, children: [_jsxs("div", { className: Style.messageNumber, children: [_jsx("span", { className: Style.messageText, children: "\u6D88\u606F" }), _jsxs("span", { className: Style.numberText, children: ["(", number, ")"] })] }), _jsx("div", { onClick: () => {
                    clear();
                }, children: _jsx(ClearOutlined, { className: Style.clearIcon }) })] }));
}
export default MessageNumber;
