import React from 'react';
import { Button, Space, Drawer, DialogPlugin } from 'tdesign-react';
import { ChevronUpIcon } from 'tdesign-icons-react';

export default function render() {
    const { placement = 'bottom', style = {} } = this.props;
    const { visible } = this.state;
    return (
        <React.Fragment>
            <Button
                variant="text"
                shape="circle"
                theme="primary"
                icon={<ChevronUpIcon />}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: '45vw',
                    ...style,
                }}
                onClick={() => {
                    this.setVisible(true);
                }}
            />

            <Drawer
                placement={placement}
                visible={visible}
                onClose={() => {
                    this.setVisible(false);
                }}
                header="Debug控制台"
                footer={<></>}
            >
                <Space breakLine={true} direction="horizontal" size="medium">
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => this.printRunningTree()}
                    >
                        R
                    </Button>
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => this.printDebugStore()}
                    >
                        S
                    </Button>
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => this.printCachedStore()}
                    >
                        C
                    </Button>
                    <Button
                        theme="primary"
                        shape="circle"
                        onClick={() => {
                            const confirmDia = DialogPlugin.confirm({
                                header: '重置数据',
                                body: '重置后，原来的数据不可恢复？',
                                confirmBtn: '确定',
                                cancelBtn: '取消',
                                onConfirm: ({ e }) => {
                                    this.setInitialData();
                                    confirmDia.hide();
                                },
                                onClose: ({ e, trigger }) => {
                                    confirmDia.hide();
                                },
                            });
                        }}
                    >
                        Rest
                    </Button>
                </Space>
            </Drawer>
        </React.Fragment>
    );
}