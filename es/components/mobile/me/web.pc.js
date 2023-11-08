import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { List, Button, Modal, Row, Col } from 'antd';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import MobileLogin from '../login';
export default function render(props) {
    const { mobiles, allowRemove, tokenMobileId, showBack = false } = props.data;
    const { goAddMobile, removeItem, recoverItem, execute, subEvent } = props.methods;
    const [open, setOpen] = useState(false);
    const eventLoggedIn = `user:info:login:${Date.now()}`;
    return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "primary", onClick: () => {
                    setOpen(true);
                }, style: { marginBottom: 16 }, children: "\u7ED1\u5B9A" }), _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsx(List, { bordered: true, children: mobiles?.map((ele, index) => (_jsx(List.Item, { extra: allowRemove &&
                                tokenMobileId !== ele.id && (_jsx("div", { onClick: () => {
                                    const modal = Modal.confirm({
                                        title: `确认删除吗？删除后无法用此号码登录`,
                                        okText: '确定',
                                        cancelText: '取消',
                                        onOk: async (e) => {
                                            removeItem(ele.id);
                                            try {
                                                await execute();
                                            }
                                            catch (err) {
                                                recoverItem(ele.id);
                                                throw err;
                                            }
                                            modal.destroy();
                                        },
                                        onCancel: (e) => {
                                            modal.destroy();
                                        },
                                    });
                                }, children: _jsx(DeleteOutlined, {}) })), children: _jsx(List.Item.Meta, { avatar: _jsx(MobileOutlined, {}), title: ele.mobile }) }, index))) }) }) }), _jsx(Modal, { title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: () => {
                    setOpen(false);
                }, children: _jsx("div", { style: { padding: 16 }, children: _jsx(MobileLogin, { callback: () => {
                            setOpen(false);
                        }, oakPath: "$mobile/me-mobile/login", oakAutoUnmount: true }) }) })] }));
}
