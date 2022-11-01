import React from 'react';
import { List, Button, Avatar, Input, Drawer } from 'antd';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';

import Style from './web.module.less';


export default function render(this: any) {
    const { avatar, nickname, isLoggedIn, refreshing, mobile, mobileCount, showDrawer } = this.state;
    const mobileText = mobileCount > 1 ? `${mobileCount}条手机号` : (mobile || '未设置');
    return (
        <div className={Style.container}>
            <div className={Style.userInfo}>
                {avatar ? (
                    <Avatar className={Style.avatar} src={avatar} />
                ) : (
                    <Avatar
                        className={Style.avatar}
                        icon={<UserOutlined className={Style.userIcon} />}
                    />
                )}
                <span className={Style.nickname}>{nickname || '未设置'}</span>
                {isLoggedIn ? (
                    <Button
                        type="primary"
                        size="small"
                        disabled={refreshing}
                        loading={refreshing}
                        onClick={() =>
                            this.setState({
                                showDrawer: true,
                            })
                        }
                    >
                        {this.t('common:action.update')}
                    </Button>
                ) : (
                    <Button
                        size="small"
                        disabled={refreshing}
                        loading={refreshing}
                        onClick={() => this.doLogin()}
                    >
                        {this.t('login')}
                    </Button>
                )}
            </div>
            <List className={Style.list} split={true}>
                <List.Item onClick={() => this.goMyMobile()}>
                    <List.Item.Meta
                        avatar={<MobileOutlined />}
                        title="手机号"
                        description={mobileText}
                    />
                </List.Item>
            </List>
            {this.state.isRoot && (
                <>
                    <div style={{ flex: 1 }} />
                    <List className={Style.list} split={true}>
                        <List.Item onClick={() => this.goUserManage()}>
                            <List.Item.Meta
                                avatar={<UserOutlined />}
                                title="用户管理"
                            />
                        </List.Item>
                    </List>
                </>
            )}
            <Drawer
                placement="bottom"
                open={showDrawer}
                title="修改昵称"
                onClose={() => {
                    this.setState({ showDrawer: false });
                    this.cleanOperation();
                }}
                extra={
                    <Button
                        disabled={
                            this.state.oakExecuting ||
                            !this.state.oakAllowExecuting
                        }
                        onClick={async () => {
                            await this.execute();
                            this.setState({ showDrawer: false });
                            this.cleanOperation();
                        }}
                    >
                        {this.t('common:action.confirm')}
                    </Button>
                }
            >
                <Input
                    placeholder="请输入昵称"
                    value={nickname}
                    onChange={async (e) => {
                        const { tokenId } = this.state;
                        await this.addOperation({
                            action: 'update',
                            data: {
                                user: {
                                    action: 'update',
                                    data: {
                                        nickname: e.target.value,
                                    },
                                },
                            },
                            filter: {
                                id: tokenId,
                            },
                        });
                    }}
                />
            </Drawer>
        </div>
    );
}
