import React from 'react';
import { Button, Space } from 'tdesign-react';

export default function render() {
    return (
        <Space
            breakLine={false}
            direction="horizontal"
            size="medium"
        >
            <Button theme="primary" shape="circle" onClick={() => this.printRunningTree()}>
                R
            </Button>
            <Button theme="primary" shape="circle" onClick={() => this.printDebugStore()}>
                S
            </Button>
            <Button theme="primary" shape="circle" onClick={() => this.printCachedStore()}>
                C
            </Button>
        </Space>
    );
}