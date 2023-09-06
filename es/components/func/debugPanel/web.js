import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button, Space, Drawer, Modal, Tooltip } from 'antd';
import Style from './web.module.less';
import OakIcon from '../../icon';
export default function render(props) {
    const { placement = 'bottom', style = {} } = props.data;
    const { printCachedStore, printDebugStore, printRunningTree, resetInitialData, downloadEnv, resetEnv } = props.methods;
    const [visible, setVisible] = useState(false);
    return (_jsxs(React.Fragment, { children: [_jsx(Button, { type: "text", shape: "circle", icon: _jsx(OakIcon, { name: "packup" }), style: {
                    position: 'fixed',
                    bottom: 0,
                    right: 'calc(100% / 2 - 16px)',
                    zIndex: 999,
                    width: 32,
                    height: 32,
                    ...style,
                }, onClick: () => {
                    setVisible(true);
                } }), _jsxs(Drawer, { getContainer: false, placement: placement, open: visible, onClose: () => {
                    setVisible(false);
                }, title: "Debug\u63A7\u5236\u53F0", footer: _jsx(_Fragment, {}), rootClassName: Style.drawer, children: [_jsx("input", { type: "file", accept: "application/json", hidden: true, id: "upload", onChange: () => {
                            const file = document.getElementById('upload')
                                .files[0];
                            if (typeof FileReader === undefined) {
                                alert('浏览器版本太老了');
                            }
                            else {
                                const reader = new FileReader();
                                reader.readAsText(file);
                                reader.onload = function () {
                                    try {
                                        const data = JSON.parse(this.result);
                                        resetEnv(data);
                                        window.location.reload();
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                };
                            }
                        } }), _jsxs(Space, { wrap: true, children: [_jsx(Tooltip, { title: "\u9875\u9762\u7ED3\u6784", children: _jsx(Button, { size: "large", type: "primary", shape: "circle", onClick: () => printRunningTree(), children: "R" }) }), _jsx(Tooltip, { title: "Store\u6570\u636E", children: _jsx(Button, { size: "large", type: "primary", shape: "circle", onClick: () => printDebugStore(), children: "S" }) }), _jsx(Tooltip, { title: "\u9875\u9762\u7F13\u5B58", children: _jsx(Button, { size: "large", type: "primary", shape: "circle", onClick: () => printCachedStore(), children: "C" }) }), _jsx(Tooltip, { title: "\u4E0B\u8F7DStore", children: _jsx(Button, { size: "large", type: "primary", shape: "circle", onClick: () => {
                                        const data = downloadEnv();
                                        const element = document.createElement('a');
                                        element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
                                            encodeURIComponent(JSON.stringify(data)));
                                        element.setAttribute('download', 'data.json');
                                        element.style.display = 'none';
                                        document.body.appendChild(element);
                                        element.click();
                                        document.body.removeChild(element);
                                    }, children: "D" }) }), _jsx(Tooltip, { title: "\u4E0A\u4F20Store", children: _jsx(Button, { size: "large", type: "primary", shape: "circle", onClick: () => {
                                        const element = document.getElementById('upload');
                                        element.click();
                                    }, children: "U" }) }), _jsx(Tooltip, { title: "\u91CD\u7F6EStore", children: _jsx(Button, { size: "large", type: "primary", danger: true, shape: "circle", onClick: () => {
                                        const modal = Modal.confirm({
                                            title: '重置数据',
                                            content: '重置后，原来的数据不可恢复',
                                            okText: '确定',
                                            cancelText: '取消',
                                            onOk: (e) => {
                                                resetInitialData();
                                                modal.destroy();
                                                window.location.reload();
                                            },
                                            onCancel: (e) => {
                                                modal.destroy();
                                            },
                                        });
                                    }, children: "Reset" }) }), _jsx(Tooltip, { title: "\u67E5\u770BOakIcon", children: _jsx(Button, { size: "large", type: "primary", shape: "circle", onClick: () => {
                                        window.open('/icon');
                                    }, children: "Icon" }) })] })] })] }));
}
