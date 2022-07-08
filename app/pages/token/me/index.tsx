import React, { Component } from 'react';
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Image, Button, List } from 'antd';

export default function render() {
    const { avatar, nickname, isLoggedIn, refreshing, mobile, mobileCount } = this.state;
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
                            onClick={() => this.onRefresh()}
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
                            onClick={() => console.log('aaa')}
                        />
                        <RightOutlined />
                    </List.Item>
                </List>
            </div>
        </div>
    );
}
