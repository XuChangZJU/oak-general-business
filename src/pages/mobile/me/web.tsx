import React from 'react';
import { CellGroup, Cell, Button, Dialog } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function render(this: any) {
    const { mobiles, confirmDeleteModalVisible, deleteIdx } = this.state;
    return (
        <div className="page-body">
            <CellGroup>
                {mobiles?.map((ele: any, index: number) => (
                    <Cell
                        key={index}
                        title={ele.mobile}
                        onClick={() => {
                            this.setState({
                                confirmDeleteModalVisible: true,
                                deleteIdx: index,
                            });
                        }}
                        leftIcon={<Icon name="mobile" />}
                        rightIcon={<Icon name="delete" />}
                    />
                ))}
            </CellGroup>
            <div style={{ flex: 1 }} />
            <Button
                size="large"
                theme="primary"
                block
                onClick={() => this.goAddMobile()}
            >
                添加
            </Button>
            <Dialog
                visible={confirmDeleteModalVisible}
                title="确认删除手机号吗？"
                confirmBtn="确定"
                cancelBtn="取消"
                content="删除后，不可恢复"
                destroyOnClose
                onClose={() => {
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
                onConfirm={async () => {
                    this.execute('remove', undefined, `${deleteIdx}`);
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
            />
        </div>
    );
}
