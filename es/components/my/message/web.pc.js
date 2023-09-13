import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Badge, Drawer, Space } from 'antd';
import classNames from 'classnames';
import { BellOutlined } from '@ant-design/icons';
import MessageList from '../../../components/message/simpleList';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { count, className, onClick, style, buttonStyle, buttonClassName } = data;
    const { goMessageList } = methods;
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Badge, { count: count, children: _jsx(Button, { className: classNames(Style.btn, buttonClassName), style: buttonStyle, type: "text", shape: "circle", icon: _jsx(BellOutlined, { className: classNames(Style.icon, className), style: style }), onClick: (e) => {
                        if (typeof onClick === 'function') {
                            onClick(e);
                            return;
                        }
                        setOpen(true);
                    } }) }), _jsx(Drawer, { title: "\u6D88\u606F", placement: "right", open: open, onClose: () => {
                    setOpen(false);
                }, extra: _jsx(Space, { children: _jsx(Button, { size: "small", type: "text", onClick: () => {
                            setOpen(false);
                            goMessageList();
                        }, children: "\u67E5\u770B\u66F4\u591A" }) }), bodyStyle: {
                    padding: 0,
                }, destroyOnClose: true, children: _jsx(MessageList, { onClose: () => {
                        setOpen(false);
                    }, oakAutoUnmount: true, oakPath: "$my/message-/message/simpleList" }) })] }));
}
