import React from 'react';
import { Button, Space, Drawer } from 'tdesign-react';
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
                    position: 'absolute',
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
                </Space>
            </Drawer>
        </React.Fragment>
    );
}