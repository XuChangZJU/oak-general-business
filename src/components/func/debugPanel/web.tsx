import React, { useState } from 'react';
import { Button, Space, Drawer, Modal, Tooltip } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function render(props: WebComponentProps<EntityDict, 'address', true, {
    placement: 'top' | 'bottom' | 'left' | 'right',
    style: Record<string, any>;
}, {
    printDebugStore: () => void;
    printCachedStore: () =>void;
    printRunningTree: () => void;
    resetInitialData: () => void;
    downloadEnv: () => void;
    resetEnv: (data: Record<string, any>) => void;
}>) {
    const { placement = 'bottom', style = {} } = props.data;
    const { printCachedStore, printDebugStore, printRunningTree, resetInitialData, downloadEnv, resetEnv } = props.methods;
    const [visible, setVisible] = useState(false);
    return (
        <React.Fragment>
            <Button
                type="text"
                shape="circle"
                icon={<UpOutlined style={{ fontSize: 12 }} />}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: '45vw',
                    zIndex: 999,
                    ...style,
                }}
                onClick={() => {
                    setVisible(true);
                }}
            />
            <Drawer
                placement={placement}
                open={visible}
                onClose={() => {
                    setVisible(false);
                }}
                title="Debug控制台"
                footer={<></>}
            >
                <input
                    type="file"
                    accept="application/json"
                    hidden
                    id="upload"
                    onChange={() => {
                        const file = (document.getElementById('upload') as any)
                            .files[0];
                        if (typeof FileReader === undefined) {
                            alert('浏览器版本太老了');
                        } else {
                            const reader = new FileReader();
                            reader.readAsText(file);
                            reader.onload = function () {
                                try {
                                    const data = JSON.parse(
                                        this.result as string
                                    );
                                    resetEnv(data);
                                    window.location.reload();
                                } catch (err) {
                                    console.error(err);
                                }
                            };
                        }
                    }}
                />
                <Space wrap={true}>
                    <Tooltip title="页面结构">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={() => printRunningTree()}
                        >
                            R
                        </Button>
                    </Tooltip>
                    <Tooltip title="Store数据">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={() => printDebugStore()}
                        >
                            S
                        </Button>
                    </Tooltip>

                    <Tooltip title="页面缓存">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={() => printCachedStore()}
                        >
                            C
                        </Button>
                    </Tooltip>
                    <Tooltip title="下载Store">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={() => {
                                const data = downloadEnv();
                                const element = document.createElement('a');
                                element.setAttribute(
                                    'href',
                                    'data:text/plain;charset=utf-8,' +
                                        encodeURIComponent(JSON.stringify(data))
                                );
                                element.setAttribute('download', 'data.json');

                                element.style.display = 'none';
                                document.body.appendChild(element);

                                element.click();

                                document.body.removeChild(element);
                            }}
                        >
                            D
                        </Button>
                    </Tooltip>

                    <Tooltip title="上传Store">
                        <Button
                            size="large"
                            type="primary"
                            shape="circle"
                            onClick={() => {
                                const element =
                                    document.getElementById('upload');
                                element!.click();
                            }}
                        >
                            U
                        </Button>
                    </Tooltip>
                    <Tooltip title="重置Store">
                        <Button
                            size="large"
                            type="primary"
                            danger
                            shape="circle"
                            onClick={() => {
                                const modal = Modal.confirm!({
                                    title: '重置数据',
                                    content: '重置后，原来的数据不可恢复',
                                    okText: '确定',
                                    cancelText: '取消',
                                    onOk: (e) => {
                                        resetInitialData();
                                        modal.destroy!();
                                        window.location.reload();
                                    },
                                    onCancel: (e) => {
                                        modal.destroy!();
                                    },
                                });
                            }}
                        >
                            Reset
                        </Button>
                    </Tooltip>
                </Space>
            </Drawer>
        </React.Fragment>
    );
}