import React from 'react';
import { List, Button, Avatar, Input, Drawer } from 'tdesign-react';
import { UserCircleIcon, Icon } from 'tdesign-icons-react';

import Style from './web.module.less';

const { ListItem, ListItemMeta } = List;

export default function render(this: any) {
    const { avatar, nickname, isLoggedIn, refreshing, mobile, mobileCount, showDrawer } = this.state;
    const mobileText = mobileCount > 1 ? `${mobileCount}条手机号` : (mobile || '未设置');
    return (
        <div className={Style.container}>
            <div className={Style.userInfo}>
                {avatar ? (
                    <Avatar className={Style.avatar} image={avatar} />
                ) : (
                    <Avatar
                        className={Style.avatar}
                        icon={<UserCircleIcon className={Style.userIcon} />}
                    />
                )}
                <span className={Style.nickname}>{nickname || '未设置'}</span>
                {isLoggedIn ? (
                    <Button
                        theme="primary"
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
            <List
                layout="horizontal"
                size="medium"
                className={Style.list}
                split={true}
            >
                <div onClick={() => this.goMyMobile()}>
                    <ListItem action={<Icon size={18} name="chevron-right" />}>
                        <ListItemMeta
                            image={<Icon size={18} name="mobile" />}
                            title="手机号"
                            description={mobileText}
                        />
                    </ListItem>
                </div>
            </List>
            {this.state.isRoot && (
                <>
                    <div style={{ flex: 1 }} />
                    <List
                        layout="horizontal"
                        size="medium"
                        className={Style.list}
                        split={true}
                    >
                        <div onClick={() => this.goUserManage()}>
                            <ListItem action={<Icon size={18} name="chevron-right" />}>
                                <ListItemMeta
                                    image={<Icon size={18} name="user" />}
                                    title="用户管理"
                                />
                            </ListItem>
                        </div>
                    </List>
                </>
            )}
            <Drawer
                placement="bottom"
                visible={showDrawer}
                header="修改昵称"
                confirmBtn={<Button
                    disabled={this.state.oakExecuting || !this.state.oakAllowExecuting}
                    onClick={async () => {
                        await this.execute();
                        this.setState({ showDrawer: false });
                        this.cleanOperation();

                    }}
                >{this.t('common:action.confirm')}</Button>}
                onCancel={() => {
                    this.setState({ showDrawer: false });
                    this.cleanOperation();
                }}
                onClose={() => {
                    this.setState({ showDrawer: false });
                    this.cleanOperation();
                }}
            >
                <Input
                    placeholder="请输入昵称"
                    value={nickname}
                    onChange={async (value) => {
                        const { tokenId } = this.state;
                        await this.addOperation({
                            action: 'update',
                            data: {
                                user: {
                                    action: 'update',
                                    data: {
                                        nickname: value,
                                    },
                                },
                            },
                            filter: {
                                id: tokenId,
                            }
                        });
                    }}
                />
            </Drawer>
        </div>
    );
}
