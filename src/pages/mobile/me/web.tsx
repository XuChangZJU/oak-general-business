import React from 'react';
import { List, Button, Dialog } from 'tdesign-react';
import { Icon } from 'tdesign-icons-react';
import Style from './web.module.less';


const { ListItem, ListItemMeta } = List;

export default function render(this: any) {
    const { mobiles, confirmDeleteModalVisible, deleteIdx } = this.state;
    return (
        <div className={Style.container}>
            <List layout="horizontal" size="medium" className={Style.list} split={true}>
                {mobiles?.map((ele: any, index: number) => (
                    <ListItem
                        key={index}
                        action={
                            <div
                                onClick={() => {
                                    this.setState({
                                        confirmDeleteModalVisible: true,
                                        deleteIdx: index,
                                    });
                                }}
                            >
                                <Icon size={18} name="delete" />
                            </div>
                        }
                    >
                        <ListItemMeta
                            image={<Icon size={18} name="mobile" />}
                            title={ele.mobile}
                        />
                    </ListItem>
                ))}
            </List>
            <div style={{ flex: 1 }} />
            <Button block size="large" theme="primary" onClick={() => this.goAddMobile()}>
                添加
            </Button>
            <Dialog
                visible={confirmDeleteModalVisible}
                header="确认删除手机号吗？"
                confirmBtn="确定"
                cancelBtn="取消"
                body="删除后，不可恢复"
                destroyOnClose
                onClose={() => {
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
                onConfirm={async () => {
                    await this.addOperation({
                        action: 'remove',
                        data: {},
                        filter: {
                            id: mobiles[deleteIdx].id,
                        },
                    });
                    await this.execute();
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
            />
        </div>
    );
}
