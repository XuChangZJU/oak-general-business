import React, { Component } from 'react';
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Image, Button, List, Drawer, Input } from 'antd';

export default function render() {
    const { avatar, nickname, isLoggedIn, refreshing, mobile, mobileCount, showDrawer, oakDirty, bbb } = this.state;
    const mobileText = mobileCount > 1 ? `${mobileCount}条手机号` : ( mobile || '未设置');
    return (
        <div className='page-body'>
            <div className='userInfo'>
                {
                    avatar ? <Avatar src={<Image src={avatar} className="avatar" />} /> : <Avatar icon={<UserOutlined />} size={120} />
                }
                <span className="nickname">{nickname || '未设置'}</span>
                {
                    isLoggedIn ?
                        <Button
                            size="small"
                            disabled={refreshing}
                            loading={refreshing}
                            onClick={() => this.setState({
                                showDrawer: true,
                            })}
                        >
                            更新
                        </Button> :
                        <Button
                            size="small"
                            disabled={refreshing}
                            loading={refreshing}
                            onClick={() => this.doLogin()}
                        >
                            登录
                        </Button>
                }
            </div>
            <div className='cell'>
                <List>
                    <List.Item style={{
                        marginLeft: 20,
                        marginRight: 20,
                    }}>
                        <List.Item.Meta
                            title="手机号"
                            description={mobileText}
                            onClick={() => this.goMyMobile()}
                        />
                        <RightOutlined />
                    </List.Item>
                </List>
            </div>
            <Drawer
                height={150}
                closable={false}
                placement="bottom"
                visible={showDrawer}
                onClose={() => {
                    this.setState({ showDrawer: false });
                    this.resetUpdateData();
                }}
            >
                <Input
                    size="large"
                    placeholder="请输入昵称"
                    value={bbb}
                    onChange={(input) => {
                        console.log(input.currentTarget.value);
                        this.setState({
                            bbb: input.currentTarget.value,
                        });
                    }}
                />
                <div style={{ height: 15 }} />
                <Button 
                    size="large"
                    type="primary"
                    disabled={!oakDirty}
                    block 
                    onClick={async () => {
                        await this.execute('update', undefined, '0.user');
                        this.setState({ showDrawer: false });
                        this.resetUpdateData();
                    }}
                >
                    {this.t('common:confirm')}
                </Button>
            </Drawer>
        </div>
    );
}
