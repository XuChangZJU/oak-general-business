import React from 'react';
import { List, Avatar, Checkbox, Button, Divider, Space } from 'tdesign-react';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
import { getName } from '../../../utils/randomUser';

const { ListItem, ListItemMeta } = List;


export default function render(this: any) {
    const {t} = this;
    const { entity } = this.props;
    const { avatar, nickname, name, mobile, relationArr } = this.state;
    return (
        <PageHeader showBack={true} title="人员详情">
            <div className={Style.container}>
                <List>
                    <ListItem>
                        <ListItemMeta
                            image={
                                avatar ? (
                                    <Avatar
                                        className={Style.avatar}
                                        image={avatar}
                                    />
                                ) : (
                                    <Avatar className={Style.avatar}>
                                        <span className={Style.text}>
                                            {getName(name)}
                                        </span>
                                    </Avatar>
                                )
                            }
                            title={<div>{name || '--'}</div>}
                            description={
                                <div className={Style.description}>
                                    <div className={Style.row}>
                                        <span className={Style.label}>
                                            昵称:&nbsp;
                                        </span>
                                        <span className={Style.value}>
                                            {nickname || '--'}
                                        </span>
                                    </div>
                                    <div className={Style.row}>
                                        <span className={Style.label}>
                                            手机号:&nbsp;
                                        </span>
                                        <span className={Style.value}>
                                            {mobile || '--'}
                                        </span>
                                    </div>
                                </div>
                            }
                        ></ListItemMeta>
                    </ListItem>
                </List>
                <Divider />
                <List className={Style.relationList}>
                    {relationArr?.map((item: any, index: number) => (
                        <ListItem key={index}>
                            <Checkbox
                                checked={item.checked}
                                label={t(entity + ':r.' + item.value)}
                                onChange={(checked) => {
                                    this.onChangeValue(item.value, checked);
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Space style={{ marginLeft: 20 }}>
                    <Button theme="primary" onClick={() => this.onConfirm()}>
                        保存
                    </Button>
                    <Button
                        variant="outline"
                        theme="primary"
                        onClick={() => this.navigateBack()}
                    >
                        返回
                    </Button>
                </Space>
            </div>
        </PageHeader>
    );
}
